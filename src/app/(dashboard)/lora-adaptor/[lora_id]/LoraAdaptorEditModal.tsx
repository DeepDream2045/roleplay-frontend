"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputText from "@/components/atoms/Input/InputText";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/atoms/Button";
import InputAdditionalInfo from "../../new-character/InputAdditionalInfo";
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

type Props = {
    onClose: () => void;
    models: TInputOption[];
    loraAdaptorData: TLoraInfo;
};

const LoraAdaptorEditModal = ({ onClose, models, loraAdaptorData }: Props) => {
    const currentBaseModel = models.find((val) => {
        return String(val.value) === String(loraAdaptorData.base_model_id);
    });

    const [baseModelVal, setBaseModelVal] = useState<TInputOption[]>(
        currentBaseModel ? [currentBaseModel] : []
    );
    const [loraRVal, setLoraRVal] = useState(loraAdaptorData.lora_r);
    const [loraAlphaVal, setLoraAlphaVal] = useState(
        loraAdaptorData.lora_alpha
    );
    const [loraDropoutVal, setLoraDropoutVal] = useState(
        loraAdaptorData.lora_dropout
    );
    const [loraBiasVal, setLoraBiasVal] = useState<TInputOption[]>([
        { label: loraAdaptorData.lora_bias, value: loraAdaptorData.lora_bias },
    ]);
    const [epochsVal, setEpochsVal] = useState(
        loraAdaptorData.num_train_epochs
    );
    const [batchSizeVal, setBatchSizeVal] = useState(
        loraAdaptorData.per_device_train_batch_size
    );
    const [learningRateVal, setLearningRateVal] = useState(
        loraAdaptorData.learning_rate
    );
    const [warmupStepsVal, setWarmupStepsVal] = useState(
        loraAdaptorData.warmup_steps
    );
    const [optimizerVal, setOptimizerVal] = useState<TInputOption[]>([
        { label: loraAdaptorData.optimizer, value: loraAdaptorData.optimizer },
    ]);
    const [lRSchedulerTypeVal, setLRSchedulerTypeVal] = useState<
        TInputOption[]
    >([
        {
            label: loraAdaptorData.lr_scheduler_type,
            value: loraAdaptorData.lr_scheduler_type,
        },
    ]);

    const [gradientAccumulationStepsVal, setGradientAccumulationStepsVal] =
        useState(loraAdaptorData.gradient_accumulation_steps);

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
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-1 py-4 px-8 flex-col bg-white min-w-2xl max-w-2xl rounded-lg">
                    <header className=" py-4 px-6 ">
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
                    <div className="px-2 mt-8 flex flex-1 flex-col pb-12">
                        <form action={formAction}>
                            <div className="flex flex-col mt-8 gap-4">
                                <div className="flex flex-1 flex-row justify-between">
                                    <div className="font-semibold text-xl">
                                        Training
                                    </div>
                                    <div className="font-medium text-sm">
                                        {""}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-medium">
                                        1. Model
                                    </div>
                                    <div className="text-sm">
                                        Your adaptor model and adaptor LoRA
                                        Config.
                                    </div>
                                    <InputText
                                        key="lora_model_name"
                                        id="lora_model_name"
                                        label="LoRA Model Name"
                                        placeholder="Select Model"
                                        name="lora_model_name"
                                        required
                                        errorMsg={
                                            state.errorMsg.lora_model_name
                                        }
                                        defaultValue={
                                            loraAdaptorData.lora_model_name
                                        }
                                        disabled
                                    />
                                    <InputTextArea
                                        key="lora_short_bio"
                                        id="lora_short_bio"
                                        label="LoRA Model Description"
                                        helperText="Description of your LoRA model"
                                        placeholder="Select Model"
                                        name="lora_short_bio"
                                        required
                                        errorMsg={state.errorMsg.lora_short_bio}
                                        defaultValue={
                                            loraAdaptorData.lora_short_bio
                                        }
                                        rows={5}
                                    />
                                    <InputSelect
                                        key="base_model_id"
                                        id="base_model_id"
                                        label="LoRA Base Model"
                                        placeholder="Select Model"
                                        name="base_model_id"
                                        options={models}
                                        value={baseModelVal}
                                        onChange={(val) => setBaseModelVal(val)}
                                        required
                                        errorMsg={state.errorMsg.base_model_id}
                                        disabled
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-medium">
                                        2. LoRA Config
                                    </div>
                                    <div className="text-sm">
                                        Lora Parameter configuration
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <InputRange
                                            key="lora_r"
                                            id="lora_r"
                                            name="lora_r"
                                            max={64}
                                            min={8}
                                            steps={8}
                                            label="lora_r"
                                            value={loraRVal}
                                            onChange={(e) => {
                                                setLoraRVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={state.errorMsg.lora_r}
                                        />
                                        <InputRange
                                            key="lora_alpha"
                                            id="lora_alpha"
                                            name="lora_alpha"
                                            max={96}
                                            min={8}
                                            steps={8}
                                            label="lora_alpha"
                                            value={loraAlphaVal}
                                            onChange={(e) => {
                                                setLoraAlphaVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={state.errorMsg.lora_alpha}
                                        />
                                        <InputRange
                                            key="lora_dropout"
                                            id="lora_dropout"
                                            name="lora_dropout"
                                            max={"1"}
                                            min={"0"}
                                            steps={"0.01"}
                                            label="lora_dropout"
                                            value={loraDropoutVal}
                                            onChange={(e) => {
                                                setLoraDropoutVal(
                                                    parseFloat(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg.lora_dropout
                                            }
                                        />
                                        <InputSelect
                                            key="lora_bias"
                                            id="lora_bias"
                                            label="LoRA Bias"
                                            placeholder="Select LoRA Bias"
                                            name="lora_bias"
                                            options={LORA_BIAS_CHOICES}
                                            value={loraBiasVal}
                                            onChange={(val) =>
                                                setLoraBiasVal(val)
                                            }
                                            required
                                            errorMsg={state.errorMsg.lora_bias}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-medium">
                                        3. Dataset
                                    </div>
                                    <div className="text-sm">
                                        Dataset File for finetune the model
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <InputAdditionalInfo
                                            name="dataset"
                                            label="Dataset"
                                            errorMsg={state.errorMsg.dataset}
                                            defaultValue={
                                                loraAdaptorData.dataset
                                            }
                                            placeholder={
                                                LORA_DATASET_PLACEHOLDER
                                            }
                                            acceptedFile={["application/json"]}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="text-lg font-medium">
                                        4. Training Argument
                                    </div>
                                    <div className="text-sm">
                                        Parameter will used on training
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <InputRange
                                            key="num_train_epochs"
                                            id="num_train_epochs"
                                            name="num_train_epochs"
                                            max={10}
                                            min={1}
                                            steps={1}
                                            label="Number of Train Epochs"
                                            value={epochsVal}
                                            onChange={(e) => {
                                                setEpochsVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg.num_train_epochs
                                            }
                                        />
                                        <InputRange
                                            key="per_device_train_batch_size"
                                            id="per_device_train_batch_size"
                                            name="per_device_train_batch_size"
                                            max={100}
                                            min={1}
                                            steps={1}
                                            label="Batch Size"
                                            value={batchSizeVal}
                                            onChange={(e) => {
                                                setBatchSizeVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg
                                                    .per_device_train_batch_size
                                            }
                                        />
                                        <InputRange
                                            key="learning_rate"
                                            id="learning_rate"
                                            name="learning_rate"
                                            max={0.01}
                                            min={0}
                                            steps={0.0001}
                                            label="Learning Rate"
                                            value={learningRateVal}
                                            onChange={(e) => {
                                                setLearningRateVal(
                                                    parseFloat(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg.learning_rate
                                            }
                                        />
                                        <InputRange
                                            key="warmup_steps"
                                            id="warmup_steps"
                                            name="warmup_steps"
                                            max={400}
                                            min={0}
                                            steps={10}
                                            label="Warmpup Steps"
                                            value={warmupStepsVal}
                                            onChange={(e) => {
                                                setWarmupStepsVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg.warmup_steps
                                            }
                                        />
                                        <InputSelect
                                            key="optimizer"
                                            id="optimizer"
                                            label="Optimizer"
                                            placeholder={`Select Optimizer`}
                                            name="optimizer"
                                            options={OPTIMIZER_CHOICES}
                                            required
                                            value={optimizerVal}
                                            onChange={(val) => {
                                                setOptimizerVal(val);
                                            }}
                                            errorMsg={state.errorMsg.optimizer}
                                        />
                                        <InputSelect
                                            key="lr_scheduler_type"
                                            id="lr_scheduler_type"
                                            label="LR Scheduler Type"
                                            placeholder={`Select LR Scheduler Type`}
                                            name="lr_scheduler_type"
                                            options={LR_SCHEDULER_TYPE_CHOICES}
                                            required
                                            value={lRSchedulerTypeVal}
                                            onChange={(val) => {
                                                setLRSchedulerTypeVal(val);
                                            }}
                                            errorMsg={
                                                state.errorMsg.lr_scheduler_type
                                            }
                                        />
                                        <InputRange
                                            key="gradient_accumulation_steps"
                                            id="gradient_accumulation_steps"
                                            name="gradient_accumulation_steps"
                                            max={50}
                                            min={1}
                                            steps={1}
                                            label="Gradient Accumulation Steps"
                                            value={gradientAccumulationStepsVal}
                                            onChange={(e) => {
                                                setGradientAccumulationStepsVal(
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                            errorMsg={
                                                state.errorMsg
                                                    .gradient_accumulation_steps
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            {state.hasError && (
                                <p className="text-red-500 mt-4">
                                    Please check the input
                                </p>
                            )}
                            <div className="mt-8">
                                <Button
                                    type="submit"
                                    color="primary"
                                    size="fullWidth"
                                    variant="fill"
                                >
                                    Update Adaptor
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default LoraAdaptorEditModal;
