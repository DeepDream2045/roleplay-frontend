"use server";

import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { getAuthSession, updateAuthSession } from "./authSession";
import {
    AuthSession,
    TUpdateProfileActionPayload,
    getProfileAPIResponseBody,
} from "../types/action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(
    state: any,
    payload: TUpdateProfileActionPayload
) {
    let data: undefined | getProfileAPIResponseBody;
    try {
        const profile_image = payload.get("profile_image");
        const full_name = payload.get("full_name");
        const username = payload.get("username");

        const form = new FormData();

        if (profile_image.size > 0) {
            form.append("profile_image", profile_image);
        }

        form.append("full_name", full_name);
        form.append("username", username);

        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/user_profile/`, {
            method: "PUT",
            body: form,
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        const req2 = await fetch(`${MAIN_API_BASE_URL}/user_profile/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            cache: "no-store",
        });

        if (!req2.ok) {
            throw req2;
        }

        data = await req2.json();
        const userData = data?.data[0];

        console.log({ userData });
        if (userData) {
            const newUserData: AuthSession["user"] = {
                id: String(userData.id),
                email: userData.email,
                full_name: userData.full_name,
                profile_image: userData.profile_image,
                username: userData.username,
                stay_sign: userData.stay_sign,
            };

            await updateAuthSession({
                access: session.access,
                refresh: session.refresh,
                user: newUserData,
            });
        }

        revalidatePath("/profile");
    } catch (error: Response | unknown) {
        console.log(error);
        const errors = await (error as Response).json();
        console.log(errors);
        return {
            hasError: true,
            errorMsg: errors,
        };
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/profile`);
    }
}
