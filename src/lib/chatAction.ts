"use server";

import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { getAuthSession } from "./authSession";
import { commonErrorHandler } from "./fetchRequest";
import { RedirectType, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
        profile_image: string | null;
    };
    character: {
        id: number;
        character_name: string;
        short_bio: string;
        character_gender: string;
        prompt: string;
        character_visibility: string;
        initial_message: string;
        image: string | null;
        NSFW: boolean;
    };
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

type createRoomResponse = {
    room_id: string;
    group_name: string;
    user: number;
    character: number;
    user_name: string | null;
    profile_image: string | null;
    character_name: string;
    character_image: string | null;
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
    try {
        const session = await getAuthSession();
        const userId = session.user!.id;
        const form = new FormData();

        form.append("user", String(userId));
        form.append("character", character_id);

        const req = await fetch(`${MAIN_API_BASE_URL}/room_info/`, {
            method: "POST",
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

        data = (await req.json()).data;

        revalidatePath("/chats");
    } catch (err) {
        console.log(err);
        let errors: any[] = [];

        const commonErr = await commonErrorHandler(err as Response | TypeError);
        if (!!commonErr) {
            errors = commonErr;
        } else {
            errors = [
                "Internal Server Error",
                "Please contact our admin for this issue",
            ];
        }

        return {
            hasError: true,
            errorMsg: errors,
        };
    }

    if (data) {
        return redirect(
            `${DASHBOARD_BASE_URL}/chats/${data.room_id}`,
            RedirectType.push
        );
    }
}

export async function getConversationAction(room_id: string) {
    try {
        const session = await getAuthSession();
        const form = new FormData();
        form.append("room_id", room_id);

        const req = await fetch(`${MAIN_API_BASE_URL}/chat_message/`, {
            method: "GET",
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

        const data = await req.json();

        return { hasError: false, room: data };
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
