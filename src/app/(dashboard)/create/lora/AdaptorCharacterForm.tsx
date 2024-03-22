"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { createLoraAction } from "@/lib/loraInfoAction";
import LoraAdaptorInputForm from "@/components/atoms/Form/LoraAdaptorInputForm";

type AdaptorCharacterFormPropsType = {
    models: TInputOption[];
};

export default function AdaptorCharacterForm({
    models,
}: AdaptorCharacterFormPropsType): ReactElement {
    const [state, formAction] = useFormState<any, any>(createLoraAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <LoraAdaptorInputForm
            formAction={formAction}
            state={state}
            models={models}
            loraData={{}}
        />
    );
}
