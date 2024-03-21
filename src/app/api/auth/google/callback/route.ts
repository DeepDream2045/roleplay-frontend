import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { updateAuthSession } from "@/lib/authSession";
import { AuthSession } from "@/types/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.url.split("?")[1];

        const url = `${MAIN_API_BASE_URL}/api/auth/login/google/?${params}`;
        const req = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }
        const data = await req.json();

        const newSession: AuthSession = {
            user: {
                id: data.user.id,
                full_name: data.user.full_name,
                username: data.user.username,
                email: data.user.email,
                profile_image: data.user.profile_image,
                stay_sign: data.user.stay_sign || false,
            },
            refresh: data.refresh_token,
            access: data.access_token,
        };

        await updateAuthSession(newSession);

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/chats`);
    } catch (error) {
        console.log(error);
        if (error instanceof Response) {
            let errorData;
            try {
                // Attempt to parse the response as JSON
                errorData = await error.json();
            } catch (e) {
                // If parsing as JSON fails, fall back to parsing as text
                errorData = await error.text();
            }

            return NextResponse.json(
                { error: errorData },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error, Please Contact Admin" },
            { status: 500 }
        );
    }
}
