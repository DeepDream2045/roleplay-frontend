import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { getAuthSession } from "./authSession";
import { fetchRequest } from "./fetchRequest";
import {
    Tag,
    TGetPublicTagInfoListActionResponse,
} from "@/types/tagInfoAction";
import { redirect } from "next/navigation";

export async function getTagInfoListAction() {
    try {
        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/tag_info/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        const data: Tag[] = await req.json();

        return { hasError: false, tags: data };
    } catch (err) {
        let errors = [];
        console.log({ err });

        if (err instanceof Response) {
            console.log(err.status);
            if (err.status === 401) {
                errors = ["Your session has expired", "Please login again"];
            } else if (err.status === 400) {
                const errorResponse = await err.json();
                errors = errorResponse.map((val: any) => val);
            } else {
                const errorResponse = await err.json();
                errors = errorResponse.messages.map((val: any) => val.message);
            }
        }

        if (err instanceof TypeError) {
            if (err.cause instanceof AggregateError) {
                const errorCode = (
                    err.cause as AggregateError & { code: string }
                ).code;

                if (errorCode === "ECONNREFUSED") {
                    errors = [
                        "Internal Server Error",
                        "Please contact our admin for this issue",
                    ];
                }
            } else if (err.cause instanceof Error) {
                const errorCode = (err.cause as Error & { code: string }).code;

                if (errorCode === "ECONNRESET") {
                    errors = [
                        "Internal Server Error",
                        "Please contact our admin for this issue",
                    ];
                }
            }
        }

        return {
            hasError: true,
            errorMsg: errors,
        };
    }
}

export async function getPublicTagInfoListAction() {
    let data: { tags: Tag[] } | undefined;
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<
            any,
            TGetPublicTagInfoListActionResponse
        >({
            url: `${MAIN_API_BASE_URL}/public_tag_info/`,
            method: "get",
            useAuthSession: false,
        });

        if (!res.isError) {
            data = { tags: res.responseData };
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                return {
                    hasError: true,
                    errorMsg: err.errorData.errors,
                };
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}`);
    }

    if (data) {
        return data;
    }
}
