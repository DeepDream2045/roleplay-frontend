"use server";

import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { getAuthSession } from "@/lib/authSession";

/**
 *
 * @param {string} url
 * @param {object} options
 * @param {boolean} sessionRequired
 */
export async function fetchWithSession(
    url: string,
    options: RequestInit,
    sessionRequired: boolean = true
) {
    // TODO: Complete all case can happen
    try {
        let headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        } as HeadersInit;

        if (sessionRequired) {
            const session = await getAuthSession();
            headers = {
                ...headers,
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh!,
            };
        }

        const request = new Request(`${MAIN_API_BASE_URL}${url}`, {
            cache: "no-store",
            headers,
            ...options,
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw response;
        }
    } catch (error) {
        let errors = [];

        let errorMsg = "An unexpected error occurred";
        if (error instanceof Response) {
            const errorData = await error.json();
            errorMsg = errorData.message || JSON.stringify(errorData);
        }

        if (error instanceof TypeError) {
            if (error.cause instanceof AggregateError) {
                const errorCode = (
                    error.cause as AggregateError & { code: string }
                ).code;

                if (errorCode === "ECONNREFUSED") {
                    errors = [
                        "Internal Server Error",
                        "Please contact our admin for this issue",
                    ];
                }
            } else if (error.cause instanceof Error) {
                const errorCode = (error.cause as Error & { code: string })
                    .code;

                if (errorCode === "ECONNRESET") {
                    errors = [
                        "Internal Server Error",
                        "Please contact our admin for this issue",
                    ];
                }
            }
        }
    }

    // if ok return data
    // if error return error
}
