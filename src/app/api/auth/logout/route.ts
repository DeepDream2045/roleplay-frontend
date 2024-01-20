import { deleteAuthSession } from "@/lib/authSession";
import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL!;

export async function GET(request: NextRequest) {
    const redirect = request.nextUrl.searchParams.get("redirect");
    await deleteAuthSession();

    return NextResponse.rewrite(`${DASHBOARD_BASE_URL}${redirect}`);
}
