"use server";

import { cookies } from "next/headers";

import { getIronSession } from "iron-session";
import { AuthGuestSession } from "../types/action";
import { MAIN_API_BASE_URL } from "@/constants/environtment";

export async function getAuthGuestSession() {
    const session = await getIronSession<AuthGuestSession>(cookies(), {
        password: process!.env!.AUTH_GUEST_COOKIES_PASSWORD!,
        cookieName: process!.env!.AUTH_GUEST_COOKIES_NAME!,
        cookieOptions: {
            secure: false,
        },
    });

    return session;
}

export async function updateAuthGuestSession(
    authGuestSession: AuthGuestSession
) {
    const session = await getAuthGuestSession();

    session.user = authGuestSession.user;
    session.refresh = authGuestSession.refresh;
    session.access = authGuestSession.access;
    session.chatRooms = authGuestSession.chatRooms;

    await session.save();
}

export async function deleteAuthSession() {
    const session = await getAuthGuestSession();

    session.destroy();
}

export async function createGuestUser() {
    "use server";
    try {
        const username = `guest_${Math.floor(
            Math.random() * 100000
        )}_${new Date().getTime()}}`;

        const email = `${username}@mail.com`;

        const req = await fetch(`${MAIN_API_BASE_URL}/create_guest_user/`, {
            method: "POST",
            cache: "no-store",
            body: JSON.stringify({
                username: username,
                email: email,
            }),
        });

        if (!req.ok) {
            throw new Error(
                "Something went wrong while creating the guest user."
            );
        }

        type CreateGuestUserResponse = {
            id: number;
            is_guest: boolean;
            full_name: string;
            username: string;
            email: string;
        };
        const data: CreateGuestUserResponse = await req.json();

        const newSession: AuthGuestSession = {
            user: {
                id: String(data.id),
                full_name: data.full_name,
                username: data.username,
                email: data.email,
            },
            refresh: undefined,
            access: undefined,
            chatRooms: [],
        };

        await updateAuthGuestSession(newSession);
        return true;
    } catch (err) {
        return err;
    }
}
