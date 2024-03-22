import { LORA_TRAIN_STATUS_BG_COLOR } from "@/constants/constants";
import { timeAgo } from "@/util/dateUtil";
import { toTitleCase } from "@/util/stringUtil";
import React from "react";

type LoraExtraInfoProps = {
    loraAdaptorLastModifiedDate: string;
    loraAdaptorTrainStatus: {
        id: number;
        lora_model_info: number;
        current_status: "pending" | "running" | "completed" | "error";
        lora_training_error: string;
    }[];
};

const LoraExtraInfo = ({
    loraAdaptorLastModifiedDate,
    loraAdaptorTrainStatus,
}: LoraExtraInfoProps) => {
    let trainStatus: "pending" | "trained" | "failed" | "untrained" =
        "untrained";

    if (loraAdaptorTrainStatus.length > 0) {
        if (loraAdaptorTrainStatus[0].current_status === "error") {
            trainStatus = "failed";
        } else if (loraAdaptorTrainStatus[0].current_status === "completed") {
            trainStatus = "trained";
        } else if (loraAdaptorTrainStatus[0].current_status === "running") {
            trainStatus = "pending";
        } else {
            trainStatus = loraAdaptorTrainStatus[0].current_status;
        }
    }

    return (
        <div className="flex flex-row gap-4 items-center justify-start cursor-pointer">
            <div
                className={`py-1 px-2 flex items-center justify-center rounded-md text-white-0 ${LORA_TRAIN_STATUS_BG_COLOR[trainStatus]}`}
            >
                {toTitleCase(trainStatus)}
            </div>
            <p
                className={`text-black-900 dark:text-white-200 text-sm leading-normal`}
            >
                {timeAgo(loraAdaptorLastModifiedDate).join(" ")}
            </p>
        </div>
    );
};

export default LoraExtraInfo;
