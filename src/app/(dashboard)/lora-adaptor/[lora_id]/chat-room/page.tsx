import { getAuthSession } from "@/lib/authSession";
import React from "react";
import Conversation from "./Conversation";
import {
    getLoraInfoAction,
    getLoraTrainingInfoAction,
} from "@/lib/loraInfoAction";

type TLoraAdaptorChatRoomPageProps = {
    params: { lora_id: string };
};

const LoraAdaptorChatRoomPage = async (
    props: TLoraAdaptorChatRoomPageProps
) => {
    const session = await getAuthSession();
    let loraAdaptorData;

    if (session?.access) {
        const loraAadaptorList = await getLoraInfoAction();

        if (!loraAadaptorList) {
            return;
        }

        if ("hasError" in loraAadaptorList && loraAadaptorList.hasError) {
            return (
                <>
                    <h1>{loraAadaptorList.errorMsg[0]}</h1>
                    {loraAadaptorList.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (
            !("hasError" in loraAadaptorList) &&
            "data" in loraAadaptorList &&
            Array.isArray(loraAadaptorList.data)
        ) {
            const loraTrainingStatusData = await getLoraTrainingInfoAction();

            if (!loraTrainingStatusData) {
                return;
            }

            if (
                "hasError" in loraTrainingStatusData &&
                loraTrainingStatusData.hasError
            ) {
                return (
                    <div className="flex flex-col gap-2 items-start">
                        <h1>Please Train Lora Adapator First</h1>
                        <p>Please Train Lora Adapator First</p>
                    </div>
                );
            }

            if (
                !("hasError" in loraTrainingStatusData) &&
                Array.isArray(loraTrainingStatusData.data)
            ) {
                const currentLoraTrainData = loraTrainingStatusData.data.find(
                    (val) => {
                        return (
                            String(val.lora_model_info) ===
                            String(props.params.lora_id)
                        );
                    }
                );

                if (!currentLoraTrainData) {
                    return (
                        <div className="flex flex-col gap-2 items-start">
                            <h1>Please Train Lora Adapator First</h1>
                            <p>Please Train Lora Adapator First</p>
                        </div>
                    );
                }
            }

            const currentLoraAdaptorData = loraAadaptorList.data.find(
                (item) => String(item.id) === String(props.params.lora_id)
            );

            if (currentLoraAdaptorData) {
                loraAdaptorData = {
                    id: currentLoraAdaptorData.id,
                    lora_model_name: currentLoraAdaptorData.lora_model_name,
                };
            }
        }
    }

    if (!loraAdaptorData) {
        return (
            <div className="flex flex-col gap-2 items-start">
                <h1>Lora Adapator Not Found</h1>
                <p>Lora Adapator Not Found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col w-full max-h-full pb-3">
            <Conversation
                loraAdaptorData={loraAdaptorData}
                loraModelId={parseInt(props.params.lora_id)}
            />
        </div>
    );
};

export default LoraAdaptorChatRoomPage;
