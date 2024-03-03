"use client";

import Button from "@/components/atoms/Button";
import { triggerTrainingAction } from "@/lib/loraInfoAction";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
    loraAdaptorId: number;
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
    return (
        <form action={formAction}>
            <Button
                variant="fill"
                color="primary"
                size="large"
                type="submit"
                className="flex-1"
            >
                Traing Lora
            </Button>
        </form>
    );
};

export default LoraAdaptorTrainTrigger;
