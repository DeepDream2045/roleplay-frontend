"use server";

import { cookies } from "next/headers";

import { getIronSession } from "iron-session";

export type UserSession = {
    id?: string;
    full_name?: string;
    email?: string;
    profile_image?: string | null;
    stay_sign?: boolean;
};

export type RefresherSession = string | undefined;

export type AccessSession = string | undefined;

export type AuthSession = {
    user?: UserSession;
    refresher?: RefresherSession;
    access?: AccessSession;
};

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
    session.refresher = authSession.refresher;
    session.access = authSession.access;

    await session.save();
}

export async function deleteAuthSession() {
    const session = await getAuthSession();

    session.destroy();
}
