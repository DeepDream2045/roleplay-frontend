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

type AdaptorCharacterFormPropsType = {
    models: TInputOption[];
};

export default function AdaptorCharacterForm({
    models,
}: AdaptorCharacterFormPropsType): ReactElement {
    const [baseModelVal, setBaseModelVal] = useState<TInputOption[]>([]);
    const [loraRVal, setLoraRVal] = useState("8");
    const [loraAlphaVal, setLoraAlphaVal] = useState("32");
    const [loraDropoutVal, setLoraDropoutVal] = useState("0.05");
    const [loraBiasVal, setLoraBiasVal] = useState<TInputOption[]>([
        LORA_BIAS_CHOICES[0],
    ]);
    const [epochsVal, setEpochsVal] = useState("5");
    const [batchSizeVal, setBatchSizeVal] = useState("1");
    const [learningRateVal, setLearningRateVal] = useState("0.0002");
    const [warmupStepsVal, setWarmupStepsVal] = useState("100");
    const [optimizerVal, setOptimizerVal] = useState<TInputOption[]>([
        OPTIMIZER_CHOICES[1],
    ]);
    const [lRSchedulerTypeVal, setLRSchedulerTypeVal] = useState<
        TInputOption[]
    >([LR_SCHEDULER_TYPE_CHOICES[0]]);

    const [gradientAccumulationStepsVal, setGradientAccumulationStepsVal] =
        useState("1");

    const [state, formAction] = useFormState<any, any>(createLoraAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <form action={formAction} className="flex flex-1 flex-col gap-10 py-5">
            <div className="flex flex-col gap-7 rounded-lg bg-white-0 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-5 font-bold leading-normal text-black-900">
                        1. Basic Info
                    </p>
                    <p className="text-sm font-normal leading-normal text-black-500">
                        Your lora basic information and model as base
                    </p>
                </div>
                <InputText
                    key="lora_model_name"
                    id="lora_model_name"
                    label="LoRA Model Name"
                    placeholder="Lora model name"
                    name="lora_model_name"
                    required
                    errorMsg={state.errorMsg.lora_model_name}
                />
                <InputTextArea
                    key="lora_short_bio"
                    id="lora_short_bio"
                    label="LoRA Model Description"
                    helperText="Description of your LoRA model"
                    placeholder="Lora Description"
                    name="lora_short_bio"
                    required
                    errorMsg={state.errorMsg.lora_short_bio}
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
                />
            </div>

            <div className="flex flex-col gap-7 rounded-lg bg-white-0 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-5 font-bold leading-normal text-black-900">
                        2. LoRA Config
                    </p>
                    <p className="text-sm font-normal leading-normal text-black-500">
                        Your lora parameter configuration
                    </p>
                </div>
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
                        setLoraRVal(e.target.value);
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
                        setLoraAlphaVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.lora_alpha}
                />
                <InputRange
                    key="lora_dropout"
                    id="lora_dropout"
                    name="lora_dropout"
                    max={1}
                    min={0}
                    steps={0.01}
                    label="lora_dropout"
                    value={loraDropoutVal}
                    onChange={(e) => {
                        setLoraDropoutVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.lora_dropout}
                />
                <InputSelect
                    key="lora_bias"
                    id="lora_bias"
                    label="LoRA Bias"
                    placeholder="Select LoRA Bias"
                    name="lora_bias"
                    options={LORA_BIAS_CHOICES}
                    value={loraBiasVal}
                    onChange={(val) => setLoraBiasVal(val)}
                    required
                    errorMsg={state.errorMsg.lora_bias}
                />
            </div>

            <div className="flex flex-col gap-7 rounded-lg bg-white-0 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-5 font-bold leading-normal text-black-900">
                        3. Dataset
                    </p>
                    <p className="text-sm font-normal leading-normal text-black-500">
                        Your dataset File for finetune the model
                    </p>
                </div>
                <InputTextAreaWithUploadFile
                    id="dataset"
                    name="dataset"
                    label="Dataset"
                    rows={10}
                    errorMsg={state.errorMsg.dataset}
                    placeholder={LORA_DATASET_PLACEHOLDER}
                    acceptedFile={["application/json"]}
                    helperText={`File allowed to upload is .json file and should be contain minimum 50 data`}
                />
            </div>

            <div className="flex flex-col gap-7 rounded-lg bg-white-0 p-4">
                <div className="flex flex-col gap-1">
                    <p className="text-5 font-bold leading-normal text-black-900">
                        4. Training Argument
                    </p>
                    <p className="text-sm font-normal leading-normal text-black-500">
                        Your lora parameter will used on training
                    </p>
                </div>
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
                        setEpochsVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.num_train_epochs}
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
                        setBatchSizeVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.per_device_train_batch_size}
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
                        setLearningRateVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.learning_rate}
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
                        setWarmupStepsVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.warmup_steps}
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
                    errorMsg={state.errorMsg.lr_scheduler_type}
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
                        setGradientAccumulationStepsVal(e.target.value);
                    }}
                    errorMsg={state.errorMsg.gradient_accumulation_steps}
                />
            </div>

            {state.hasError && (
                <p className="text-red-500 mt-4">Please check the input</p>
            )}
            <div className="mt-8">
                <Button
                    type="submit"
                    color="primary"
                    size="fullWidth"
                    variant="fill"
                    className="min-h-12 max-h-12 flex flex-row justify-center items-center"
                >
                    Create Lora
                </Button>
            </div>
        </form>
    );
}
