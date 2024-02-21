export function getRequest() {}

type TCommonErrorHandlerResponse = any[] | undefined;
export async function commonErrorHandler(
    err: Response | TypeError
): Promise<TCommonErrorHandlerResponse> {
    let errors = [];
    if (err instanceof Response) {
        console.log(err.status);
        if (err.status === 401) {
            errors = ["Your session has expired", "Please login again"];
        } else if (err.status === 400) {
            const errorResponse = await err.json();
            if ("error" in errorResponse) {
                errors = errorResponse.error.map((val: any) => val);
            } else {
                errors = errorResponse.map((val: any) => val);
            }
        } else {
            const errorResponse = await err.json();
            console.log(errorResponse);
            if (Array.isArray(errorResponse)) {
                errors = errorResponse.map((val: any) => val.message);
            } else {
                errors = [errorResponse.error];
            }
        }

        return errors;
    }

    if (err instanceof TypeError) {
        if (err.cause instanceof AggregateError) {
            const errorCode = (err.cause as AggregateError & { code: string })
                .code;

            if (errorCode === "ECONNREFUSED") {
                // errors = [
                //     "Internal Server Error",
                //     "Please contact our admin for this issue",
                // ];
            }
        } else if (err.cause instanceof Error) {
            const errorCode = (err.cause as Error & { code: string }).code;

            if (errorCode === "ECONNRESET") {
                // errors = [
                //     "Internal Server Error",
                //     "Please contact our admin for this issue",
                // ];
            }
        }

        errors = [
            "Internal Server Error",
            "Please contact our admin for this issue",
        ];

        return errors;
    }

    return undefined;
}
