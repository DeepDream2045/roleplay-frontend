import axios, { AxiosRequestConfig } from "axios";
import { getAuthSession } from "./authSession";

/**
 * Interface for the parameters accepted by the fetchRequest function.
 * @template TBody - The type of the body of the request.
 * @template TResponse - The expected type of the response data.
 */
interface FetchRequestParams<TBody, TResponse> {
    url: string;
    method: "get" | "post" | "put" | "delete";
    body?: TBody;
    useAuthSession?: boolean;
}

/**
 * Interface for the successful response structure.
 * @template TResponse - The expected type of the response data.
 */
interface SuccessResponse<TResponse> {
    isError: false;
    responseData: TResponse;
}

/**
 * Interface for the error data structure.
 */
interface ErrorData {
    errorTitle: string;
    errorSubtitle: string;
    errors: any[];
}

/**
 * Interface for the error response structure.
 */
interface ErrorResponse {
    isError: true;
    isExpiredSession: boolean;
    errorData: ErrorData;
}

/**
 * Asynchronous function to make an Axios request with error handling.
 * Handles authentication if required and formats the response or error.
 *
 * @template TBody - The type of the body of the request.
 * @template TResponse - The expected type of the response data.
 * @param {FetchRequestParams<TBody, TResponse>} params - The parameters for the Axios request.
 * @returns {Promise<SuccessResponse<TResponse> | ErrorResponse>} - A promise that resolves to either a success response with data or an error response.
 */
export async function fetchRequest<TBody, TResponse>({
    url,
    method,
    body,
    useAuthSession = true,
}: FetchRequestParams<TBody, TResponse>): Promise<
    SuccessResponse<TResponse> | ErrorResponse
> {
    try {
        const headers: any = {};

        // Adds authorization and refresh tokens to the headers if useAuthSession is true.
        if (useAuthSession) {
            const session = await getAuthSession();
            const accessToken = session.access;
            const refreshToken = session.refresh;
            if (accessToken) {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }

            if (refreshToken) {
                headers["user-refresh-token"] = refreshToken;
            }
        }

        // Preparing Axios request configuration
        const config: AxiosRequestConfig = {
            url,
            method,
            headers,
            timeout: 50000,
            // Adjusting to allow body in GET request
            ...(method.toLowerCase() === "get"
                ? { params: body }
                : { data: body }),
        };

        // Making the request using Axios
        const response = await axios(config);

        // Return a success response
        return { isError: false, responseData: response.data as TResponse };
    } catch (error) {
        // Handles any errors thrown during the Axios operation or response processing.
        if (axios.isAxiosError(error)) {
            console.log("Axios Error: ", error);

            if (error.response?.status && error.response?.status >= 500) {
                throw {
                    isError: true,
                    isExpiredSession: false,
                    errorData: {
                        errorTitle: "Internal Server Error",
                        errorSubtitle: "Please try again later.",
                        errors: [
                            "Internal Server Error",
                            "Please try again later.",
                        ],
                    },
                };
            }
            // Customize based on actual error response structure
            let isExpiredSession = false;
            if (
                error.response?.status === 401 &&
                error.response?.data.detail !==
                    "Authentication credentials were not provided."
            ) {
                console.log({ error5: error.response?.data });
                isExpiredSession = true;
            } else {
                console.log({ error4: error.response?.data });

                throw {
                    isError: true,
                    isExpiredSession: false,
                    errorData: {
                        errorTitle: "Unexpected Error",
                        errorSubtitle: "An unexpected error occurred",
                        errors: [
                            "Unexpected Error",
                            "An unexpected error occurred",
                        ],
                    },
                };
            }

            let errors = [];

            if (
                typeof error.response?.data === "object" &&
                !Array.isArray(error.response?.data) &&
                "errors" in error.response.data
            ) {
                errors = error.response.data.errors;
            }

            if (
                typeof error.response?.data === "object" &&
                !Array.isArray(error.response.data) &&
                !("errors" in error.response.data)
            ) {
                errors = error.response.data;
            }

            const errorData: ErrorData = {
                errorTitle: "Error",
                errorSubtitle: "An error occurred",
                errors: errors,
            };

            throw {
                isError: true,
                isExpiredSession,
                errorData,
            };
        }

        console.log("Unexpected Error: ", error);

        // Generic or unknown error handling
        throw {
            isError: true,
            isExpiredSession: false,
            errorData: {
                errorTitle: "Unexpected Error",
                errorSubtitle: "An unexpected error occurred",
                errors: [],
            },
        };
    }
}
