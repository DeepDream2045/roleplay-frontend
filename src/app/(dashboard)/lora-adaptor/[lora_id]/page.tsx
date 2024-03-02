"use server";

import Rating from "@/components/atoms/Rating/Rating";
import { getAuthSession } from "@/lib/authSession";
import Link from "next/link";
import React from "react";
import CreateChatRoomForm from "./CreateChatRoomForm";
import LoraAdaptorEditDeleteAction from "./LoraAdaptorEditDeleteAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import { getLoraInfoAction } from "@/lib/loraInfoAction";

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
        console.log({ loraAdapatorData });

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

    const loraAdaptorShouldAuthInfo = loraAdaptorShouldAuth.find((lora) => {
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

    const loraAdaptorAccessed = loraAdaptorShouldAuthInfo;

    return (
        <div className="flex flex-col pt-5 flex-1 items-center min-h-dvh min-w-full max-h-dvh max-w-full">
            <div className="flex flex-1 max-h-full overflow-y-scroll max-w-full min-w-full flex-col items-center gap-8 pb-20">
                <div
                    key="character_basic_info_container"
                    className="flex flex-col gap-2 items-center"
                >
                    <h3 className="font-semibold">
                        {loraAdaptorAccessed?.lora_model_name}
                    </h3>
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
                        <p className="font-medium">@No Name </p>
                    </Link>
                </div>

                <div
                    key="character_additional_info_container"
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p>{"5.0"}</p>
                        <Rating rating={2.5} />
                        <p>(2)</p>
                    </div>

                    {String(loraAdaptorAccessed.user) ===
                        String(session.user?.id) && (
                        <LoraAdaptorEditDeleteAction
                            models={formattedModel}
                            loraAdaptorData={loraAdaptorAccessed!}
                        />
                    )}
                </div>

                <div
                    key="character_additional_basic_info_container"
                    className="flex flex-col gap-4"
                >
                    <div
                        key="character_short_description_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Short description</h3>
                        <p>{loraAdaptorAccessed?.lora_short_bio || ""}</p>
                    </div>
                </div>
            </div>
            {/* <CreateChatRoomForm lora_id={lora_id} /> */}
        </div>
    );
}

export default LoraAdaptorPage;
