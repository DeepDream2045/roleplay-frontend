"use server";

import { Sleep } from "@/lib/sleep";
import { AuthSession, updateAuthSession } from "./authSession";
import { redirect } from "next/navigation";

const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;

export async function magicLinkRequestService(state: any, payload: any) {
    try {
        const email = payload.get("email");
        console.log(email);

        await Sleep(1000);
        // will fetch API outside next

        const form = new FormData();

        form.append("email", email);
        const req = await fetch(`${MAIN_API_BASE_URL}/login_request/`, {
            method: "POST",
            body: form,
            mode: "cors",
        });

        // console.log(req);

        const response = await req.json();
        // console.log(response);

        return {
            formSubmitted: true,
            emailSuccessSent: true,
        };
    } catch (error) {
        console.log(error);
        return {
            formSubmitted: true,
            emailSuccessSent: false,
        };
    }
}

export async function magicLinkVerifyService(token: string) {
    await Sleep(1500);
    const form = new FormData();

    form.append("token", token);

    const req = await fetch(`${MAIN_API_BASE_URL}/login_verify/`, {
        method: "POST",
        body: form,
        mode: "cors",
    });

    return req;
}

export async function magicLinkVerifyServiceAction(
    token: string,
    state: any,
    formData: any
) {
    const verifyReq = await magicLinkVerifyService(token);

    if (verifyReq.ok && verifyReq.status === 200) {
        const data = await verifyReq.json();
        if (data?.error) {
            return data?.error;
        }
        console.log(data);
        const newSession: AuthSession = {
            user: {
                id: data.data.id,
                full_name: data.data.full_name,
                email: data.data.email,
                profile_image: data.data.profile_image,
                stay_sign: data.data.stay_sign,
            },
            refresher: data.refresher,
            access: data.access,
        };

        await updateAuthSession(newSession);

        return redirect(`${process.env.NEXTAUTH_URL}/chats`);
    } else {
        console.log({ verifyReq });

        return { isNotValid: true, message: verifyReq.statusText };
    }
}
