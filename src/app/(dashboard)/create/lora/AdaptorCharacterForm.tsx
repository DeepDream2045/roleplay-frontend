"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { TInputOption } from "@/components/atoms/Input/InputType";
import InputText from "@/components/atoms/Input/InputText";
import InputSelect from "@/components/atoms/Input/InputSelect";
import Button from "@/components/atoms/Button";
import InputRange from "@/components/atoms/Input/InputRange";
import { createLoraAction } from "@/lib/loraInfoAction";
import {
    LORA_BIAS_CHOICES,
    LORA_DATASET_PLACEHOLDER,
    LR_SCHEDULER_TYPE_CHOICES,
    OPTIMIZER_CHOICES,
} from "@/constants/constants";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputTextAreaWithUploadFile from "@/components/atoms/Input/InputTextAreaWithUploadFile";
import FormContainer from "@/components/atoms/Form/FormContainer";
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
