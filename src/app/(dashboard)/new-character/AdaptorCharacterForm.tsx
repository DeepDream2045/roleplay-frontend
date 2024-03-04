"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { TInputOption } from "@/components/atoms/Input/InputType";
import InputText from "@/components/atoms/Input/InputText";
import InputSelect from "@/components/atoms/Input/InputSelect";
import Button from "@/components/atoms/Button";
import InputAdditionalInfo from "./InputAdditionalInfo";
import InputRange from "@/components/atoms/Input/InputRange";
import { createLoraAction } from "@/lib/loraInfoAction";
import {
    LORA_BIAS_CHOICES,
    LORA_DATASET_PLACEHOLDER,
    LR_SCHEDULER_TYPE_CHOICES,
    OPTIMIZER_CHOICES,
} from "@/constants/constants";

type AdaptorCharacterFormPropsType = {
    models: TInputOption[];
};

export default function AdaptorCharacterForm({
    models,
}: AdaptorCharacterFormPropsType): ReactElement {
    const [baseModelVal, setBaseModelVal] = useState<TInputOption[]>([]);
    const [loraRVal, setLoraRVal] = useState("0");
    const [loraAlphaVal, setLoraAlphaVal] = useState("0");
    const [loraDropoutVal, setLoraDropoutVal] = useState("0");
    const [loraBiasVal, setLoraBiasVal] = useState<TInputOption[]>([]);
    const [epochsVal, setEpochsVal] = useState("0");
    const [batchSizeVal, setBatchSizeVal] = useState("0");
    const [learningRateVal, setLearningRateVal] = useState("0");
    const [warmupStepsVal, setWarmupStepsVal] = useState("0");
    const [optimizerVal, setOptimizerVal] = useState<TInputOption[]>([]);
    const [lRSchedulerTypeVal, setLRSchedulerTypeVal] = useState<
        TInputOption[]
    >([]);

    const [gradientAccumulationStepsVal, setGradientAccumulationStepsVal] =
        useState("0");

    const [state, formAction] = useFormState<any, any>(createLoraAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <div className="mt-2 flex flex-1 flex-col max-w-screen-md w-full pb-12">
            {/* Image Form */}
            <form action={formAction}>
                <div className="flex flex-col mt-8 gap-4">
                    <div className="flex flex-1 flex-row justify-between">
                        <div className="font-semibold text-xl">Training</div>
                        <div className="font-medium text-sm">{""}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-medium">1. Model</div>
                        <div className="text-sm">
                            Your adaptor model and adaptor LoRA Config.
                        </div>
                        <InputText
                            key="lora_model_name"
                            id="lora_model_name"
                            label="LoRA Model Name"
                            placeholder="Select Model"
                            name="lora_model_name"
                            required
                            errorMsg={state.errorMsg.lora_model_name}
                        />
                        <InputText
                            key="lora_short_bio"
                            id="lora_short_bio"
                            label="LoRA Model Bio"
                            helperText="Description of your LoRA model"
                            placeholder="Select Model"
                            name="lora_short_bio"
                            required
                            errorMsg={state.errorMsg.lora_short_bio}
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
                                max={1000}
                                min={0}
                                steps={1}
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
                                max={1000}
                                min={0}
                                steps={1}
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
                                max={1000}
                                min={0}
                                steps={1}
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
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-medium">3. Dataset</div>
                        <div className="text-sm">
                            Dataset File for finetune the model
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputAdditionalInfo
                                name="dataset"
                                label="Dataset"
                                errorMsg={state.errorMsg.dataset}
                                placeholder={LORA_DATASET_PLACEHOLDER}
                                acceptedFile={["application/json"]}
                                helperText={`File allowed to upload is .json file and should be contain minimum 50 data`}
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
                                max={1000}
                                min={"0"}
                                steps={1}
                                label="Number of Train Epochs"
                                value={epochsVal}
                                onChange={(e) => {
                                    setEpochsVal(e.target.value);
                                }}
                                helperText={`the value should be from xxx to xxx`}
                                errorMsg={state.errorMsg.num_train_epochs}
                            />
                            <InputRange
                                key="per_device_train_batch_size"
                                id="per_device_train_batch_size"
                                name="per_device_train_batch_size"
                                max={1000}
                                min={"0"}
                                steps={1}
                                label="Batch Size"
                                value={batchSizeVal}
                                onChange={(e) => {
                                    setBatchSizeVal(e.target.value);
                                }}
                                errorMsg={
                                    state.errorMsg.per_device_train_batch_size
                                }
                            />
                            <InputRange
                                key="learning_rate"
                                id="learning_rate"
                                name="learning_rate"
                                max={1000}
                                min={"0"}
                                steps={1}
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
                                max={1000}
                                min={"0"}
                                steps={1}
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
                                max={1000}
                                min={"0"}
                                steps={1}
                                label="Gradient Accumulation Steps"
                                value={gradientAccumulationStepsVal}
                                onChange={(e) => {
                                    setGradientAccumulationStepsVal(
                                        e.target.value
                                    );
                                }}
                                errorMsg={
                                    state.errorMsg.gradient_accumulation_steps
                                }
                            />
                        </div>
                    </div>
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
                    >
                        Create Adaptor
                    </Button>
                </div>
            </form>
        </div>
    );
}
