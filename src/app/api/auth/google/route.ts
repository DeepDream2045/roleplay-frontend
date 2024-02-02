import { getAuthURL } from "@/lib/googleOAuthHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = getAuthURL();
        console.log({ url });

        return NextResponse.redirect(url);
    } catch (error) {
        return NextResponse.error();
    }
}
