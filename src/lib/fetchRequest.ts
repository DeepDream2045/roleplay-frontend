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
        console.log({ error });
        // Handles any errors thrown during the Axios operation or response processing.
        if (axios.isAxiosError(error)) {
            // Customize based on actual error response structure
            const isExpiredSession = error.response?.status === 401;
            console.log(error.response);

            const errorData: ErrorData = {
                errorTitle: "Error",
                errorSubtitle: "An error occurred",
                errors:
                    "errors" in error.response?.data
                        ? error.response?.data.errors
                        : error.response?.data || {},
            };

            throw {
                isError: true,
                isExpiredSession,
                errorData,
            };
        }

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
