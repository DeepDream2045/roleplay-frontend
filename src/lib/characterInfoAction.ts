"use server";

import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { getAuthSession } from "./authSession";
import {
    CharacterInfoType,
    TCreateCharacterActionPayload,
    TCreateCharacterActionState,
    TDeleteCharacterActionState,
    TUpdateCharacterActionState,
    createCharacterAPIResponseBody,
} from "../types/action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCharacterAction(
    state: TCreateCharacterActionState,
    payload: TCreateCharacterActionPayload
) {
    let data: undefined | createCharacterAPIResponseBody;
    try {
        const image = payload.get("image");
        const character_name = payload.get("character_name");
        const short_bio = payload.get("short_bio");
        const character_gender = payload.get("character_gender");
        const tags = payload.getAll("tags");
        const model_id = payload.get("model_id");
        const prompt = payload.get("prompt");
        const character_visibility = payload.get("character_visibility");

        const initial_message = payload.get("initial_message");
        const NSFW = payload.get("NSFW") === "on" ? "true" : "false";
        const lorebook = payload.get("lorebook");
        const language = payload.get("language");
        const character_story = payload.get("character_story");

        const form = new FormData();

        form.append("image", image);
        form.append("character_name", character_name);
        form.append("short_bio", short_bio);
        form.append("character_gender", character_gender);

        if (tags.length > 0) {
            form.append("tags", JSON.stringify(tags));
        }

        form.append("model_id", model_id);
        form.append("prompt", prompt);
        form.append("character_visibility", character_visibility);
        form.append("initial_message", initial_message);
        form.append("NSFW", NSFW);
        form.append("lorebook", lorebook);
        form.append("language", language);
        form.append("character_story", character_story);

        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/character_info/`, {
            method: "POST",
            body: form,
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        data = await req.json();
    } catch (error: Response | unknown) {
        console.log({ error });
        const errors = await (error as Response).json();
        console.log({ errors });
        return {
            hasError: true,
            errorMsg:
                typeof errors === "object" && "error" in errors
                    ? errors?.error
                    : errors,
        };
    }
    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/character/${data.data.id}`);
    }
}

export async function updateCharacterAction(
    character_id: string,
    state: TUpdateCharacterActionState,
    payload: TCreateCharacterActionPayload
) {
    let data: undefined | createCharacterAPIResponseBody;
    try {
        const image = payload.get("image");

        const character_name = payload.get("character_name");
        const short_bio = payload.get("short_bio");
        const character_gender = payload.get("character_gender");
        const tags = payload.getAll("tags");
        const model_id = payload.get("model_id");
        const prompt = payload.get("prompt");
        const character_visibility = payload.get("character_visibility");

        const initial_message = payload.get("initial_message");
        const NSFW = payload.get("NSFW") === "on" ? "true" : "false";
        const lorebook = payload.get("lorebook");
        const language = payload.get("language");
        const character_story = payload.get("character_story");

        const form = new FormData();

        form.append("id", character_id);
        if (image.size > 0) {
            form.append("image", image);
        }

        form.append("character_name", character_name);
        form.append("short_bio", short_bio);
        form.append("character_gender", character_gender);

        console.log({ tags });

        if (tags.length > 0) {
            form.append("tags", JSON.stringify(tags));
        }

        form.append("model_id", model_id);
        form.append("prompt", prompt);
        form.append("character_visibility", character_visibility);
        form.append("initial_message", initial_message);
        form.append("NSFW", NSFW);
        form.append("lorebook", lorebook);
        form.append("language", language);
        form.append("character_story", character_story);

        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/character_info/`, {
            method: "PUT",
            body: form,
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresh,
            } as HeadersInit,
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        data = await req.json();
        console.log({ data });
    } catch (error: Response | unknown) {
        // console.log(error);
        const errors = await (error as Response).json();
        console.log(errors);
        return {
            hasError: true,
            errorMsg: errors,
        };
    }
    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/character/${character_id}`);
    }
}

export async function deleteCharacterAction(
    character_id: string,
    state: TDeleteCharacterActionState,
    payload: any
) {
    let data: undefined | { message: string };
    try {
        const session = await getAuthSession();

        const form = new FormData();
        form.append("id", character_id);

        const req = await fetch(`${MAIN_API_BASE_URL}/character_info/`, {
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
        return redirect(`${DASHBOARD_BASE_URL}/`);
    }
}

export async function getCharacterInfoAction() {
    try {
        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/character_info/`, {
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

        const data: CharacterInfoType[] = await req.json();
        revalidatePath("/character");
        revalidatePath("/profile");
        return { hasError: false, characters: data };
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

export async function getPublicCharacterInfoAction() {
    try {
        const req = await fetch(`${MAIN_API_BASE_URL}/public_character_info/`, {
            method: "GET",
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        const data: CharacterInfoType[] = await req.json();

        return { hasError: false, characters: data };
    } catch (err) {
        let errors = [];
        if (err instanceof Response) {
            console.log(err.status);
            if (err.status === 401) {
                errors = ["Your session has expired", "Please login again"];
            } else if (err.status === 400) {
                const errorResponse = await err.json();
                errors = errorResponse.map((val: any) => val);
            } else if (err.status === 502) {
                errors = [
                    "Internal Server Error",
                    "Please contact our admin for this issue",
                ];
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
