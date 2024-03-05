"use server";

import {
    TCreateLoraActionState,
    TCreateLoraFormBody,
    TCreateLoraResponse,
    TDeleteLoraActionState,
    TGetLoraCompletedTrainingListInfoActionReturn,
    TGetLoraCompletedTrainingListInfoResponse,
    TGetLoraInfoResponse,
    TGetLoraPublicInfoResponse,
    TGetLoraTrainingInfoActionReturn,
    TGetLoraTrainingInfoResponse,
    TLoraFormPayload,
    TLoraTrainingInfo,
    TSendMessageToLoraCompletedTrainingActionReturn,
    TSendMessageToLoraCompletedTrainingFormBody,
    TSendMessageToLoraCompletedTrainingResponse,
    TUpdateLoraActionState,
    TUpdateLoraFormBody,
    TUpdateLoraResponse,
    TgetLoraInfoActionReturn,
    TgetLoraPublicInfoActionReturn,
} from "@/types/loraInfoAction";
import { fetchRequest } from "./fetchRequest";
import {
    DASHBOARD_BASE_URL,
    MAIN_API_BASE_URL,
} from "@/constants/environtment";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createLoraAction(
    state: TCreateLoraActionState,
    payload: TLoraFormPayload
) {
    let data: undefined | TCreateLoraResponse;
    let isExpiredSession = false;
    let dataset = "";
    try {
        dataset = payload.get("dataset");
        dataset = JSON.stringify(JSON.parse(dataset), null, 4);
    } catch (err) {
        return {
            hasError: true,
            errorMsg: {
                dataset: ["Invalid dataset, please input a valid JSON string"],
            },
        };
    }

    try {
        const lora_model_name = payload.get("lora_model_name");
        const lora_short_bio = payload.get("lora_short_bio");
        const base_model_id = payload.get("base_model_id");

        const lora_r = payload.get("lora_r");
        const lora_alpha = payload.get("lora_alpha");
        const lora_dropout = payload.get("lora_dropout");
        const lora_bias = payload.get("lora_bias");

        const num_train_epochs = payload.get("num_train_epochs");
        const per_device_train_batch_size = payload.get(
            "per_device_train_batch_size"
        );
        const learning_rate = payload.get("learning_rate");
        const warmup_steps = payload.get("warmup_steps");
        const optimizer = payload.get("optimizer");
        const lr_scheduler_type = payload.get("lr_scheduler_type");
        const gradient_accumulation_steps = payload.get(
            "gradient_accumulation_steps"
        );

        const body: TCreateLoraFormBody = {
            lora_model_name,
            lora_short_bio,
            base_model_id,
            lora_r: parseInt(lora_r as string),
            lora_alpha: parseInt(lora_alpha as string),
            lora_dropout: parseFloat(lora_dropout as string),
            lora_bias,
            dataset,
            num_train_epochs,
            per_device_train_batch_size,
            learning_rate,
            warmup_steps,
            optimizer,
            lr_scheduler_type,
            gradient_accumulation_steps,
        };

        const res = await fetchRequest<
            TCreateLoraFormBody,
            TCreateLoraResponse
        >({
            method: "post",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body,
        });

        if (!res.isError) {
            data = res.responseData;
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
        return redirect(`${DASHBOARD_BASE_URL}/new-character`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor/${data.id}`);
    }
}

export async function updateLoraAction(
    lodaAdaptorId: number,
    state: TUpdateLoraActionState,
    payload: TLoraFormPayload
) {
    let data: undefined | TUpdateLoraResponse;
    let isExpiredSession = false;
    let dataset = "";

    try {
        dataset = payload.get("dataset");
        dataset = JSON.stringify(JSON.parse(dataset), null, 4);
    } catch (err) {
        return {
            hasError: true,
            errorMsg: {
                dataset: ["Invalid dataset, please input a valid JSON string"],
            },
        };
    }

    try {
        const lora_short_bio = payload.get("lora_short_bio");

        const lora_r = payload.get("lora_r");
        const lora_alpha = payload.get("lora_alpha");
        const lora_dropout = payload.get("lora_dropout");
        const lora_bias = payload.get("lora_bias");

        const num_train_epochs = payload.get("num_train_epochs");
        const per_device_train_batch_size = payload.get(
            "per_device_train_batch_size"
        );
        const learning_rate = payload.get("learning_rate");
        const warmup_steps = payload.get("warmup_steps");
        const optimizer = payload.get("optimizer");
        const lr_scheduler_type = payload.get("lr_scheduler_type");
        const gradient_accumulation_steps = payload.get(
            "gradient_accumulation_steps"
        );

        const body: TUpdateLoraFormBody = {
            id: lodaAdaptorId,
            lora_short_bio,
            lora_r: parseInt(lora_r as string),
            lora_alpha: parseInt(lora_alpha as string),
            lora_dropout: parseFloat(lora_dropout as string),
            lora_bias,
            dataset,
            num_train_epochs,
            per_device_train_batch_size,
            learning_rate,
            warmup_steps,
            optimizer,
            lr_scheduler_type,
            gradient_accumulation_steps,
        };

        const res = await fetchRequest<
            TUpdateLoraFormBody,
            TUpdateLoraResponse
        >({
            method: "put",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body,
        });

        if (!res.isError) {
            data = res.responseData;
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
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
        return redirect(`${DASHBOARD_BASE_URL}/new-character`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor/${lodaAdaptorId}`);
    }
}

export async function deleteLoraAction(
    loraAdaptorId: number,
    state: TDeleteLoraActionState,
    payload: any
) {
    let data: undefined | { message: string };
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<{ id: number }, { message: string }>({
            method: "delete",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
            body: {
                id: loraAdaptorId,
            },
        });

        if (!res.isError) {
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
            data = res.responseData;
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                return err;
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}

export async function getLoraInfoAction(): Promise<TgetLoraInfoActionReturn> {
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<undefined, TGetLoraInfoResponse>({
            method: "get",
            url: `${MAIN_API_BASE_URL}/lora_modal_info/`,
        });

        if (!res.isError) {
            return res.responseData;
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
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}

export async function getLoraTrainingInfoAction(): Promise<TGetLoraTrainingInfoActionReturn> {
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<undefined, TGetLoraTrainingInfoResponse>(
            {
                method: "get",
                url: `${MAIN_API_BASE_URL}/get_lora_adapters_status/`,
            }
        );

        if (!res.isError) {
            return res.responseData;
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
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}

export async function triggerTrainingAction(
    loraAdaptorId: number,
    state: TDeleteLoraActionState,
    payload: any
) {
    let isExpiredSession = false;
    let data: any;

    try {
        const res = await fetchRequest<
            { lora_model_id: number },
            { message: string }
        >({
            method: "post",
            url: `${MAIN_API_BASE_URL}/train_lora_adapters/`,
            body: {
                lora_model_id: loraAdaptorId,
            },
        });

        if (!res.isError) {
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
            data = res.responseData;
        }
    } catch (err: any) {
        if ("isError" in err && err.isError) {
            if ("isExpiredSession" in err && err.isExpiredSession) {
                isExpiredSession = true;
            } else {
                return err;
            }
        }
    }

    if (isExpiredSession) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor/${loraAdaptorId}`);
    }

    if (data) {
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor/${loraAdaptorId}`);
    }
}

export async function getLoraCompletedTrainingListInfoAction(): Promise<TGetLoraCompletedTrainingListInfoActionReturn> {
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<
            undefined,
            TGetLoraCompletedTrainingListInfoResponse
        >({
            method: "get",
            url: `${MAIN_API_BASE_URL}/lora_adapters_list/`,
        });

        if (!res.isError) {
            return res.responseData;
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
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}

export async function sendMessageToLoraCompletedTrainingAction(
    lodaAdaptorId: number,
    state: any,
    payload: any
): Promise<TSendMessageToLoraCompletedTrainingActionReturn> {
    let data: undefined | TSendMessageToLoraCompletedTrainingResponse;
    let isExpiredSession = false;

    try {
        const user_text = payload.get("user_text");

        const body: TSendMessageToLoraCompletedTrainingFormBody = {
            lora_model_id: lodaAdaptorId,
            user_text,
        };

        const res = await fetchRequest<
            TSendMessageToLoraCompletedTrainingFormBody,
            TSendMessageToLoraCompletedTrainingResponse
        >({
            method: "post",
            url: `${MAIN_API_BASE_URL}/run_lora_adapters/`,
            body,
        });

        if (!res.isError) {
            data = res.responseData;
            revalidatePath("/lora-adaptor");
            revalidatePath("/");
            revalidatePath("/profile");
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
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }

    if (data) {
        return data;
    }
}

export async function getLoraPublicInfoAction(): Promise<TgetLoraPublicInfoActionReturn> {
    let isExpiredSession = false;

    try {
        const res = await fetchRequest<undefined, TGetLoraPublicInfoResponse>({
            method: "get",
            url: `${MAIN_API_BASE_URL}/public_lora_adapters/`,
        });

        if (!res.isError) {
            return res.responseData;
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
        return redirect(`${DASHBOARD_BASE_URL}/lora-adaptor`);
    }
}
