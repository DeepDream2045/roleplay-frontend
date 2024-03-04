"use server";

import { getAuthSession } from "@/lib/authSession";
import Link from "next/link";
import React from "react";
import LoraAdaptorEditDeleteAction from "./LoraAdaptorEditDeleteAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import {
    getLoraInfoAction,
    getLoraTrainingInfoAction,
} from "@/lib/loraInfoAction";
import { snakeCaseToTitle } from "@/util/convertTextUtil";
import LoraAdaptorTrainTrigger from "./LoraAdaptorTrainTrigger";

type TLoraAdaptorPageProps = {
    params: { lora_id: string };
};

async function LoraAdaptorPage({ params: { lora_id } }: TLoraAdaptorPageProps) {
    const session = await getAuthSession();
    let loraAdaptorShouldAuth: TLoraInfo[] = [];
    let formattedModel: TInputOption[] = [];

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
    }

    const loraAdaptorShouldAuthInfo:
        | (TLoraInfo & {
              train_status?: "pending" | "error" | "completed";
              train_error?: string;
          })
        | undefined = loraAdaptorShouldAuth.find((lora) => {
        return (
            String(lora.id) === String(lora_id) &&
            String(lora.user) === String(session.user?.id)
        );
    });

    if (!loraAdaptorShouldAuthInfo) {
        return (
            <>
                <h1>Not Found</h1>
                <p>Lora Adaptor is not found</p>
            </>
        );
    }

    const loraTrainingStatusData = await getLoraTrainingInfoAction();

    if (!loraTrainingStatusData) {
        return;
    }

    if (
        "hasError" in loraTrainingStatusData &&
        loraTrainingStatusData.hasError
    ) {
        console.log({ errorMsg: loraTrainingStatusData.errorMsg });

        loraAdaptorShouldAuthInfo.train_status = undefined;
    }

    if (
        !("hasError" in loraTrainingStatusData) &&
        Array.isArray(loraTrainingStatusData.data)
    ) {
        console.log(loraTrainingStatusData);
        const currentLoraTrainData = loraTrainingStatusData.data.find((val) => {
            return (
                String(val.lora_model_info) ===
                String(loraAdaptorShouldAuthInfo.id)
            );
        });

        if (!currentLoraTrainData) {
            loraAdaptorShouldAuthInfo.train_status = undefined;
        } else {
            loraAdaptorShouldAuthInfo.train_status =
                currentLoraTrainData.current_status;
        }
    }

    const loraAdaptorAccessed = loraAdaptorShouldAuthInfo;

    console.log({
        loraAdaptorAccessedStatus: loraAdaptorAccessed.train_status,
    });

    return (
        <div className="flex flex-col pt-5 flex-1 items-center min-h-dvh min-w-full max-h-dvh max-w-full">
            <div className="flex flex-1 max-h-full overflow-y-scroll max-w-full min-w-full flex-col items-start gap-8 pb-20">
                <div
                    key="character_basic_info_container"
                    className="flex flex-col gap-2 items-start"
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
                                {loraAdaptorAccessed?.train_status ||
                                    "Not Trained"}
                            </p>
                        </div>
                        {loraAdaptorAccessed?.train_status === "error" && (
                            <p>{loraAdaptorAccessed?.train_error}</p>
                        )}
                        {loraAdaptorAccessed?.train_status === "pending" && (
                            <p className="text-sm">
                                Please refresh to get latest training status
                            </p>
                        )}
                        {loraAdaptorAccessed?.train_status === undefined && (
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
                                        : `/profile/${loraAdaptorAccessed?.user}`
                                }
                                className="text-blue-500"
                                target="_blank"
                            >
                                <p className="font-medium">@NoName </p>
                            </Link>
                        </div>
                        <div
                            key="character_additional_info_container"
                            className="flex flex-col gap-4"
                        >
                            {String(loraAdaptorAccessed.user) ===
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
                                            ]
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
                                            ]
                                        }
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoraAdaptorPage;
