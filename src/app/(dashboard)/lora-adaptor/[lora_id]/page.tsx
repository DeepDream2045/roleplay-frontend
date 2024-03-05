"use server";

import { getAuthSession } from "@/lib/authSession";
import Link from "next/link";
import React, { ReactNode } from "react";
import LoraAdaptorEditDeleteAction from "./LoraAdaptorEditDeleteAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import {
    getLoraInfoAction,
    getLoraPublicInfoAction,
} from "@/lib/loraInfoAction";
import { snakeCaseToTitle } from "@/util/convertTextUtil";
import LoraAdaptorTrainTrigger from "./LoraAdaptorTrainTrigger";
import CreateLoraChatRoomForm from "./CreateLoraChatRoomForm";

type TLoraAdaptorPageProps = {
    params: { lora_id: string };
};

async function LoraAdaptorPage({ params: { lora_id } }: TLoraAdaptorPageProps) {
    const session = await getAuthSession();
    let loraAdaptorShouldAuth: TLoraInfo[] = [];
    let formattedModel: TInputOption[] = [];
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

        const modelData = await getModelInfoListAction();

        if (modelData.hasError) {
            return (
                <>
                    <h1>{modelData.errorMsg[0]}</h1>
                    {modelData.errorMsg?.slice(1).map((val) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        const models = modelData.models!;

        formattedModel = models.map((item) => {
            return { label: item.model_name, value: String(item.id) };
        });

        const loraAdaptorShouldAuthInfo: TLoraInfo | undefined =
            loraAdaptorShouldAuth.find((lora) => {
                return (
                    String(lora.id) === String(lora_id) &&
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
                    return String(lora.id) === String(lora_id);
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

    return (
        <div className="flex flex-col pt-5 flex-1 items-center min-h-dvh min-w-full max-h-dvh max-w-full">
            <div className="flex flex-1 max-h-full overflow-y-scroll max-w-full min-w-full flex-col items-center gap-8 pb-20">
                <div
                    key="character_basic_info_container"
                    className="flex flex-col gap-2 items-start min-w-2xl max-w-2xl"
                >
                    <header>
                        <h1>Lora Information</h1>
                    </header>
                    <div
                        className="flex flex-col gap-2 items-start"
                        id="lora_basic_info"
                        key="lora_basic_info"
                    >
                        <h2>Lora Basic Information</h2>
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <h3 className="font-semibold">Lora Name</h3>
                            <p>{loraAdaptorAccessed?.lora_model_name}</p>
                        </div>
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <h3 className="font-semibold">
                                Lora Training Status
                            </h3>
                            <p>
                                {loraAdaptorAccessed?.current_status[0]
                                    .current_status || "Not Trained"}
                            </p>
                        </div>
                        {loraAdaptorAccessed?.current_status[0]
                            .current_status === "error" && (
                            <p>
                                {
                                    loraAdaptorAccessed?.current_status[0]
                                        .lora_training_error
                                }
                            </p>
                        )}
                        {(loraAdaptorAccessed?.current_status[0]
                            .current_status === "pending" ||
                            loraAdaptorAccessed?.current_status[0]
                                .current_status === "running") && (
                            <p className="text-sm">
                                Please refresh to get latest training status
                            </p>
                        )}
                        {loraAdaptorAccessed?.current_status[0]
                            .current_status === undefined && (
                            <LoraAdaptorTrainTrigger
                                loraAdaptorId={loraAdaptorAccessed.id}
                            />
                        )}
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <h3 className="font-semibold">Lora Author</h3>
                            <Link
                                href={
                                    String(loraAdaptorAccessed?.user) ===
                                    String(session.user?.id)
                                        ? `/profile`
                                        : `/profile/${loraAdaptorAccessed?.user.id}`
                                }
                                className="text-blue-500"
                                target="_blank"
                            >
                                <p className="font-medium">
                                    @{loraAdaptorAccessed.user.username}
                                </p>
                            </Link>
                        </div>
                        <div
                            key="character_additional_info_container"
                            className="flex flex-col gap-4"
                        >
                            {String(loraAdaptorAccessed.user.id) ===
                                String(session.user?.id) && (
                                <LoraAdaptorEditDeleteAction
                                    models={formattedModel}
                                    loraAdaptorData={loraAdaptorAccessed!}
                                />
                            )}
                        </div>
                    </div>

                    <div
                        className="flex flex-col gap-2 items-start"
                        id="lora_config"
                        key="lora_config"
                    >
                        <h2>Lora Configuration</h2>
                        {[
                            "lora_r",
                            "lora_alpha",
                            "lora_dropout",
                            "lora_bias",
                        ].map((val: string) => {
                            return (
                                <div
                                    className="flex flex-row gap-4 items-center justify-center"
                                    key={val}
                                >
                                    <h3 className="font-semibold">
                                        {snakeCaseToTitle(val)}
                                    </h3>
                                    <p>
                                        {
                                            loraAdaptorAccessed[
                                                val as keyof TLoraInfo
                                            ] as ReactNode
                                        }
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        className="flex flex-col gap-2 items-start"
                        id="lora_config"
                        key="lora_config"
                    >
                        <h2>Lora Training Argument</h2>
                        {[
                            "num_train_epochs",
                            "per_device_train_batch_size",
                            "learning_rate",
                            "warmup_steps",
                            "optimizer",
                            "lr_scheduler_type",
                            "gradient_accumulation_steps",
                        ].map((val: string) => {
                            return (
                                <div
                                    className="flex flex-row gap-4 items-center justify-center"
                                    key={val}
                                >
                                    <h3 className="font-semibold">
                                        {snakeCaseToTitle(val)}
                                    </h3>
                                    <p>
                                        {
                                            loraAdaptorAccessed[
                                                val as keyof TLoraInfo
                                            ] as ReactNode
                                        }
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {loraAdaptorAccessed &&
                loraAdaptorAccessed.current_status[0].current_status ===
                    "completed" && <CreateLoraChatRoomForm lora_id={lora_id} />}
        </div>
    );
}

export default LoraAdaptorPage;
