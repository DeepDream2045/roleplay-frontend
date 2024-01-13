import { AuthSession, updateAuthSession } from "@/lib/authSession";
import { magicLinkVerifyService } from "@/lib/magicLinkAction";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: { params: { token: string } }) {
    const verifyReq = await magicLinkVerifyService(params.token);

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

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/chats`);
    } else {
        console.log({ verifyReq });

        return new NextResponse(null, {
            status: 404,
            statusText: "Error hehehe",
        });
    }
}
