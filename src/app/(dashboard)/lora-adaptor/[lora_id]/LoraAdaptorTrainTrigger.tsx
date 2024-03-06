"use client";

import Button from "@/components/atoms/Button";
import { triggerTrainingAction } from "@/lib/loraInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
    loraAdaptorId: number;
    current_status: TLoraInfo["current_status"];
};

const LoraAdaptorTrainTrigger = (props: Props) => {
    const triggerTrainingActionWithCharId = triggerTrainingAction.bind(
        null,
        props.loraAdaptorId
    );

    const [state, formAction] = useFormState<any, any>(
        triggerTrainingActionWithCharId,
        {
            hasError: false,
            errorMsg: {},
        }
    );

    if (
        props.current_status.length > 0 &&
        props.current_status[0].current_status === "completed"
    ) {
        return;
    }

    return (
        <form
            className="flex flex-col w-full left-0 items-center justify-center ml-[-1.75rem]"
            style={{
                backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity))",
            }}
            action={formAction}
        >
            {((props.current_status.length > 0 &&
                props.current_status[0].current_status === "pending") ||
                (props.current_status.length > 0 &&
                    props.current_status[0].current_status === "running")) && (
                <p className="text-sm">
                    Please refresh to get latest training status
                </p>
            )}
            <Button
                type="submit"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky bottom-0"
                disabled={props.current_status.length > 0}
            >
                Train Lora
            </Button>
        </form>
    );
};

export default LoraAdaptorTrainTrigger;
