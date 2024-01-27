"use server";

import {
    AuthSession,
    TMagicLinkRequestServicePayload,
    TMagicLinkRequestServiceState,
} from "../types/action";
import { updateAuthSession } from "./authSession";
import { redirect } from "next/navigation";

const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;

export async function magicLinkRequestService(
    state: TMagicLinkRequestServiceState,
    payload: TMagicLinkRequestServicePayload
) {
    try {
        const email = payload.get("email");

        const form = new FormData();
        form.append("email", email);

        await fetch(`${MAIN_API_BASE_URL}/login_request/`, {
            method: "POST",
            body: form,
            cache: "no-store",
        });

        return {
            formSubmitted: true,
            emailSuccessSent: true,
        };
    } catch (error) {
        return {
            formSubmitted: true,
            emailSuccessSent: false,
        };
    }
}

export async function magicLinkVerifyServiceAction(
    token: string,
    state: any,
    formData: any
) {
    const form = new FormData();

    form.append("token", token);

    const verifyReq = await fetch(`${MAIN_API_BASE_URL}/login_verify/`, {
        method: "POST",
        body: form,
        mode: "cors",
        cache: "no-store",
    });

    if (verifyReq.ok && verifyReq.status === 200) {
        const data = await verifyReq.json();
        if (data?.error) {
            return data?.error;
        }

        const newSession: AuthSession = {
            user: {
                id: data.data.id,
                full_name: data.data.full_name,
                email: data.data.email,
                profile_image: data.data.profile_image,
                stay_sign: data.data.stay_sign,
            },
            refresh: data.refresh,
            access: data.access,
        };

        await updateAuthSession(newSession);

        return redirect(`${process.env.NEXTAUTH_URL}/chats`);
    } else {
        return { isNotValid: true, message: verifyReq.statusText };
    }
}
