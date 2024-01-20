import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { getAuthSession } from "./lib/authSession";

const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL!;
const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;

// This function can be marked `async` if using `await` inside

// TODO: Fix this depends on latest API
// export async function middleware(request: NextRequest, event: NextFetchEvent) {
//     const { pathname } = request.nextUrl;
//     const session = await getAuthSession();
//     console.log({ session });

//     // when session.access are not exist means user not login yet
//     // so token verification will skip and continue to access the page
//     if (!session?.access) {
//         return NextResponse.next();
//     }

//     // if session.access is exist, means user is login
//     // by that token verification is need to execute.
//     const form = new FormData();

//     form.append("token", session.access as string);

//     const req = await fetch(`${MAIN_API_BASE_URL}/api/token/verify/`, {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${session.access}`,
//             "user-refresh-token": session.refresh,
//         } as HeadersInit,
//         body: form,
//         cache: "no-store",
//     });

//     // if /api/token/verify/ response with ok. means access is valid,
//     // so user can continue to access the page
//     if (req.ok) {
//         return NextResponse.next();
//     }

//     // if the access token is not valid, middleware will redirect user to /api/auth/refresh-token
//     const response = NextResponse.redirect(
//         `${DASHBOARD_BASE_URL}/api/auth/verify-token?redirect=${pathname}`
//     );

//     return response;
// }

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
