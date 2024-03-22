"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputText from "@/components/atoms/Input/InputText";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/atoms/Button";
import { TLoraInfo } from "@/types/loraInfoAction";
import { updateLoraAction } from "@/lib/loraInfoAction";
import InputRange from "@/components/atoms/Input/InputRange";
import {
    LORA_BIAS_CHOICES,
    LORA_DATASET_PLACEHOLDER,
    LR_SCHEDULER_TYPE_CHOICES,
    OPTIMIZER_CHOICES,
} from "@/constants/constants";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputTextAreaWithUploadFile from "@/components/atoms/Input/InputTextAreaWithUploadFile";
import LoraAdaptorInputForm, {
    LoraAdaptorInputFormProps,
} from "@/components/atoms/Form/LoraAdaptorInputForm";

type Props = {
    onClose: () => void;
    models: TInputOption[];
    loraAdaptorData: TLoraInfo;
};

const LoraAdaptorEditModal = ({ onClose, models, loraAdaptorData }: Props) => {
    const loraData: LoraAdaptorInputFormProps["loraData"] = {
        lora_model_name: loraAdaptorData.lora_model_name,
        lora_short_bio: loraAdaptorData.lora_short_bio,
        base_model_id: loraAdaptorData.base_model_id,
        lora_r: loraAdaptorData.lora_r,
        lora_alpha: loraAdaptorData.lora_alpha,
        lora_dropout: loraAdaptorData.lora_dropout,
        lora_bias: loraAdaptorData.lora_bias,
        dataset: loraAdaptorData.dataset,
        num_train_epochs: loraAdaptorData.num_train_epochs,
        per_device_train_batch_size:
            loraAdaptorData.per_device_train_batch_size,
        learning_rate: loraAdaptorData.learning_rate,
        warmup_steps: loraAdaptorData.warmup_steps,
        optimizer: loraAdaptorData.optimizer,
        lr_scheduler_type: loraAdaptorData.lr_scheduler_type,
        gradient_accumulation_steps:
            loraAdaptorData.gradient_accumulation_steps,
    };

    const updateLoraAdaptorActionWithCharId = updateLoraAction.bind(
        null,
        loraAdaptorData.id
    );

    const [state, formAction] = useFormState<any, any>(
        updateLoraAdaptorActionWithCharId,
        {
            hasError: false,
            errorMsg: {},
        }
    );

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center p-8 overflow-y-hidden scrollbar-hide "
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-1 overflow-y-hidden scrollbar-hide pt-4 px-8 flex-col bg-white-0 dark:bg-black-900 min-w-screen-lg max-w-screen-lg rounded-lg">
                    <header className="py-4 px-6 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2 className="flex flex-1 justify-center">
                                Update Lora
                            </h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="px-2 mt-8 flex flex-1 flex-col pb-12 overflow-y-scroll scrollbar-hide">
                        <LoraAdaptorInputForm
                            formAction={formAction}
                            state={state}
                            models={models}
                            loraData={loraData}
                        />
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default LoraAdaptorEditModal;
