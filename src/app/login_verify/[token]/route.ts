import { AuthSession, updateAuthSession } from "@/lib/authSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { token: string } }
) {
    console.log(params.token);

    const newSession: AuthSession = {
        user: {
            id: "123213",
            full_name: "Ersapta Aristo",
            email: "aristoersapta@gmail.com",
            profile_image: null,
            stay_sign: true,
        },
        refresher: "abc",
        access: "def",
    };

    await updateAuthSession(newSession);

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/chats`);
}
