"use server";

import { getAuthSession } from "./authSession";
import { Sleep } from "./sleep";

const MAIN_API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_API_BASE_URL!;

export async function createModelAction(state: any, payload: any) {
    try {
        const character_name = payload.get("character_name");
        const short_bio = payload.get("short_bio");
        const character_gender = payload.get("character_gender");
        const tags = payload.get("tags");
        const model_id = payload.get("model_id");
        const prompt = payload.get("prompt");
        const prompt_visibility = payload.get("prompt_visibility");
        const initial_message = payload.get("initial_message");
        const NSFW = payload.get("NSFW");
        const lorebook = payload.get("lorebook");
        const language = payload.get("language");

        await Sleep(1000);
        // will fetch API outside next

        const form = new FormData();

        form.append("character_name", character_name);
        form.append("short_bio", short_bio);
        form.append("character_gender", character_gender);
        form.append("tags", tags);
        form.append("model_id", model_id);
        form.append("prompt", prompt);
        form.append("prompt_visibility", prompt_visibility);
        form.append("initial_message", initial_message);
        form.append("NSFW", NSFW);
        form.append("lorebook", lorebook);
        form.append("language", language);

        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/model_info/`, {
            method: "POST",
            body: form,
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresher,
            },
            cache: "no-store",
        });

        // console.log(req);
        if (!req.ok) {
            throw req;
        }

        const response = await req.json();
        // console.log(response);

        return {
            hasError: false,
            errorMsg: {},
        };
    } catch (error: Response | unknown) {
        console.log(error);
        const errors = await (error as Response).json();
        console.log(errors);
        return {
            hasError: true,
            errorMsg: errors,
        };
    }
}

export type ModelInfoType = {
    id: number;
    created_date: Date;
    modified_date: Date;
    model_name: string;
    short_bio: string;
    model_location: string;
    prompt_template: string;
    temperature: number;
    repetition_penalty: number;
    top_p: number;
    top_k: number;
    user: number;
};

export type GetModelInfoListActionReturnType = {
    hasError: boolean;
    models?: ModelInfoType[];
    errorMsg?: any[];
};
export async function getModelInfoListAction(): Promise<GetModelInfoListActionReturnType> {
    try {
        const session = await getAuthSession();

        const req = await fetch(`${MAIN_API_BASE_URL}/model_info/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.access}`,
                "user-refresh-token": session.refresher,
            },
            cache: "no-store",
        });

        if (!req.ok) {
            throw req;
        }

        const data = await req.json();
        return { hasError: false, models: data as ModelInfoType[] };
    } catch (err) {
        const errors = await (err as Response).json();
        return {
            hasError: true,
            errorMsg: errors,
        };
    }
}
