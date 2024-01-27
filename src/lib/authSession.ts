"use server";

import { cookies } from "next/headers";

import { getIronSession } from "iron-session";
import { AuthSession } from "../types/action";

export async function getAuthSession() {
    const session = await getIronSession<AuthSession>(cookies(), {
        password: process!.env!.AUTH_COOKIES_PASSWORD!,
        cookieName: process!.env!.AUTH_COOKIES_NAME!,
    });

    return session;
}

export async function updateAuthSession(authSession: AuthSession) {
    const session = await getAuthSession();

    session.user = authSession.user;
    session.refresh = authSession.refresh;
    session.access = authSession.access;

    await session.save();
}

export async function deleteAuthSession() {
    const session = await getAuthSession();

    session.destroy();
}
