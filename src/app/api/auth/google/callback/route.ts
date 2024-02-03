import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        console.log("halo get request");
        console.log({ request });
        console.log({ url: request.url });
        const params = request.url.split("?")[1];
        const urlParams = new URLSearchParams(params);

        const code = urlParams.get("code");

        console.log({ code });

        return NextResponse.json(request);
    } catch (error) {
        return NextResponse.error();
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log("halo post request");
        return NextResponse.json(request);
    } catch (error) {
        return NextResponse.error();
    }
}
