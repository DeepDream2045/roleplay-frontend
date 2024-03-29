import { getAuthSession } from "@/lib/authSession";
import React from "react";
import Conversation from "./Conversation";
import {
    getLoraInfoAction,
    getLoraPublicInfoAction,
} from "@/lib/loraInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";

type TLoraAdaptorChatRoomPageProps = {
    params: { lora_id: string };
};

const LoraAdaptorChatRoomPage = async (
    props: TLoraAdaptorChatRoomPageProps
) => {
    const session = await getAuthSession();
    let loraAdaptorShouldAuth: TLoraInfo[] = [];
    let loraAdaptorAccessed: TLoraInfo | undefined;

    if (session?.access) {
        const loraAdapatorData = await getLoraInfoAction();
        if (!loraAdapatorData) {
            return;
        }

        if ("hasError" in loraAdapatorData && loraAdapatorData.hasError) {
            return (
                <>
                    <h1>{loraAdapatorData.errorMsg[0]}</h1>
                    {loraAdapatorData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (
            !("hasError" in loraAdapatorData) &&
            Array.isArray(loraAdapatorData.data)
        ) {
            loraAdaptorShouldAuth = loraAdapatorData.data;
        }

        const loraAdaptorShouldAuthInfo: TLoraInfo | undefined =
            loraAdaptorShouldAuth.find((lora) => {
                return (
                    String(lora.id) === String(props.params.lora_id) &&
                    String(lora.user.id) === String(session.user?.id)
                );
            });

        if (loraAdaptorShouldAuthInfo) {
            loraAdaptorAccessed = loraAdaptorShouldAuthInfo;
        }
    }

    if (!loraAdaptorAccessed) {
        const loraAdapatorPublicData = await getLoraPublicInfoAction();
        if (!loraAdapatorPublicData) {
            return;
        }

        if (
            "hasError" in loraAdapatorPublicData &&
            loraAdapatorPublicData.hasError
        ) {
            return (
                <>
                    <h1>{loraAdapatorPublicData.errorMsg[0]}</h1>
                    {loraAdapatorPublicData.errorMsg
                        ?.slice(1)
                        .map((val: string) => {
                            return <p key={val}>{val}</p>;
                        })}
                </>
            );
        }

        if (
            !("hasError" in loraAdapatorPublicData) &&
            Array.isArray(loraAdapatorPublicData.data)
        ) {
            const formattedLoraAdapatorPublicData: TLoraInfo[] =
                loraAdapatorPublicData.data.map((item) => {
                    return {
                        id: item.lora_model_info.id,
                        created_date: item.lora_model_info.created_date,
                        modified_date: item.lora_model_info.modified_date,
                        lora_model_name: item.lora_model_info.lora_model_name,
                        lora_short_bio: item.lora_model_info.lora_short_bio,
                        dataset: "",
                        num_train_epochs: item.lora_model_info.num_train_epochs,
                        per_device_train_batch_size:
                            item.lora_model_info.per_device_train_batch_size,
                        learning_rate: item.lora_model_info.learning_rate,
                        warmup_steps: item.lora_model_info.warmup_steps,
                        optimizer: item.lora_model_info.optimizer,
                        lr_scheduler_type:
                            item.lora_model_info.lr_scheduler_type,
                        gradient_accumulation_steps:
                            item.lora_model_info.gradient_accumulation_steps,
                        lora_alpha: item.lora_model_info.lora_alpha,
                        lora_dropout: item.lora_model_info.lora_dropout,
                        lora_r: item.lora_model_info.lora_r,
                        lora_bias: item.lora_model_info.lora_bias,
                        current_status: [
                            {
                                id: 999999,
                                lora_model_info: item.lora_model_info.id,
                                current_status: item.current_status,
                                lora_training_error: item.lora_training_error,
                            },
                        ],
                        base_model_id: {
                            id: item.lora_model_info.base_model_id,
                            model_name: "unknown-model-name",
                            short_bio: "unknown-short-bio",
                        },
                        user: {
                            id: item.user.id,
                            full_name: item.user.full_name,
                            username: item.user.username,
                            profile_image: item.user.profile_image,
                        },
                    };
                });

            const loraAdaptorPublicInfo: TLoraInfo | undefined =
                formattedLoraAdapatorPublicData.find((lora) => {
                    return String(lora.id) === String(props.params.lora_id);
                });

            if (loraAdaptorPublicInfo) {
                loraAdaptorAccessed = loraAdaptorPublicInfo;
            }
        }
    }

    if (!loraAdaptorAccessed) {
        return (
            <>
                <h1>Not Found</h1>
                <p>Lora is not found</p>
            </>
        );
    }

    if (
        loraAdaptorAccessed.current_status.length === 0 ||
        loraAdaptorAccessed.current_status[0].current_status !== "completed"
    ) {
        return (
            <>
                <h1>Bad Request</h1>
                <p>Please train the lora first</p>
            </>
        );
    }

    return (
        <div className="flex flex-1 flex-col w-full max-h-full pb-3">
            <Conversation
                loraAdaptorData={loraAdaptorAccessed}
                loraModelId={parseInt(props.params.lora_id)}
            />
        </div>
    );
};

export default LoraAdaptorChatRoomPage;
