import { getAuthSession, updateAuthSession } from "@/lib/authSession";
import { AuthSession } from "@/types/action";
import { NextRequest, NextResponse } from "next/server";
const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;
const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL!;

export async function GET(request: NextRequest) {
    const session = await getAuthSession();
    const redirect = request.nextUrl.searchParams.get("redirect");

    const form = new FormData();

    form.append("token", session.access as string);

    const req = await fetch(`${MAIN_API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session.access}`,
            "user-refresh-token": session.refresh,
        } as HeadersInit,
        body: form,
        cache: "no-store",
    });

    if (req.status !== 401) {
        const data = await req.json();

        const newSession: AuthSession = {
            user: {
                ...session.user,
            },
            refresh: data.refresh,
            access: data.access,
        };
        await updateAuthSession(newSession);
        return NextResponse.redirect(`${DASHBOARD_BASE_URL}${redirect}`);
    }

    return NextResponse.redirect(
        `${DASHBOARD_BASE_URL}/api/auth/logout?redirect=${redirect}`
    );
}
