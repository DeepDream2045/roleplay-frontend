"use server";

import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { getAuthSession } from "./authSession";
import { fetchRequest } from "./fetchRequest";
import { RedirectType, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAuthGuestSession } from "./authGuestSession";
import { CharacterInfoType } from "@/types/action";

export type TConversation = {
    id: number;
    created_date: string;
    modified_date: string;
    user_message: string;
    character_message: string;
    is_edited: boolean;
    chat: number;
};
export type TRoomInfo = {
    room_id: string;
    type: number;
    group_name: string;
    user: {
        id: number;
        full_name: string;
        username: string;
        profile_image: string | null;
    };
    character: CharacterInfoType;
    chatroom: TConversation[];
};

type TGetRoomInfoActionResponse = {
    message: string;
    data: TRoomInfo[];
};

type TGetRoomInfoActionListActionReturnOkay = {
    hasError: false;
    rooms: TRoomInfo[];
};

type TGetRoomInfoActionListActionReturnError = {
    hasError: true;
    errorMsg: any[];
};

export type TGetRoomInfoActionListActionReturn =
    | TGetRoomInfoActionListActionReturnOkay
    | TGetRoomInfoActionListActionReturnError;

export async function getRoomInfoAction(): Promise<TGetRoomInfoActionListActionReturn> {
    try {
        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/room_info/`, {
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

        const data: TGetRoomInfoActionResponse = await req.json();
        revalidatePath("/chat");
        revalidatePath("/");
        return { hasError: false, rooms: data.data };
    } catch (err) {
        let errors = [];
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

export async function getGuestRoomInfoAction(): Promise<TGetRoomInfoActionListActionReturn> {
    try {
        const session = await getAuthGuestSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/guest_room_info_by_id/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            } as HeadersInit,
            body: JSON.stringify({
                user_id: session!.user!.id,
            }),
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        const data: TGetRoomInfoActionResponse["data"] = await req.json();
        revalidatePath("/chat");
        revalidatePath("/");
        return { hasError: false, rooms: data };
    } catch (err) {
        let errors = [];
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

type createRoomResponse = {
    room_id: string;
    type: number;
    group_name: string;
    user: {
        id: number;
        full_name: string;
        username: string;
        profile_image: string;
    };
    character: CharacterInfoType;
};

export type TCreateRoomInfoActionState =
    | null
    | {
          hasError: true;
          errorMsg: any[];
      }
    | {
          hasError: true;
          errorMsg: undefined;
      };

export async function createRoomInfoAction(
    character_id: string,
    state: any,
    payload: any
) {
    let data: createRoomResponse | undefined;
    let isExpiredSession = false;

    const session = await getAuthSession();

    // login user
    if (session?.access) {
        try {
            const body = {
                character: parseInt(character_id),
            };

            const res = await fetchRequest<
                { character: number },
                { message: string; data: createRoomResponse }
            >({
                method: "get",
                url: `${MAIN_API_BASE_URL}/room_info/`,
                body: body,
            });

            if (!res.isError) {
                data = res.responseData.data;
            }
        } catch (err: any) {
            if ("isError" in err && err.isError) {
                if ("isExpiredSession" in err && err.isExpiredSession) {
                    isExpiredSession = true;
                } else {
                    console.log({ err });
                    return {
                        hasError: true,
                        errorMsg: err.errorData.errors,
                    };
                }
            }
        }

        if (isExpiredSession) {
            return redirect(`${DASHBOARD_BASE_URL}/character/${character_id}`);
        }
    } else {
        const guestSession = await getAuthGuestSession();

        const body = {
            character: parseInt(character_id),
            user_id: guestSession.user?.id,
        };

        const req = await fetch(
            `${MAIN_API_BASE_URL}/guest_create_room_info/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                } as HeadersInit,
                body: JSON.stringify(body),
                cache: "no-store",
            }
        );

        if (!req.ok) {
            throw req;
        }

        data = (await req.json()).data;

        return {
            hasError: false,
            data: data,
        };
    }

    revalidatePath("/chats");
    if (data) {
        return redirect(
            `${DASHBOARD_BASE_URL}/chats/${data.room_id}`,
            RedirectType.push
        );
    }
}

export async function deleteRoomAction(
    room_id: string,
    state: any,
    payload: any
) {
    let data: undefined | { message: string };
    try {
        const session = await getAuthSession();

        if (!session?.access) {
            return {
                hasError: false,
            };
        }
        const form = new FormData();
        form.append("room_id", room_id);

        const req = await fetch(`${MAIN_API_BASE_URL}/room_info/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            body: form,
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        data = await req.json();
    } catch (err) {
        let errors = [];
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

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/chats`);
    }
}
