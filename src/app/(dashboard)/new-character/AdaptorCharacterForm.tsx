"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { createCharacterAction } from "@/lib/characterInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import InputText from "@/components/atoms/Input/InputText";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputFile from "@/components/atoms/Input/InputFile";
import InputToggle from "@/components/atoms/Input/InputToggle";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputRadio from "@/components/atoms/Input/InputRadio";
import Button from "@/components/atoms/Button";
import InputAdditionalInfo from "./InputAdditionalInfo";
import InputRange from "@/components/atoms/Input/InputRange";

type AdaptorCharacterFormPropsType = {
    models: TInputOption[];
    tags: TInputOption[];
};

export default function AdaptorCharacterForm({
    models,
    tags,
}: AdaptorCharacterFormPropsType): ReactElement {
    const [modelVal, setModelVal] = useState<TInputOption[]>([]);
    const [FineTuningTypeVal, setFineTuningTypeVal] = useState<TInputOption[]>(
        []
    );
    const [loraRVal, setLoraRVal] = useState("0");
    const [loraAlphaVal, setLoraAlphaVal] = useState("0");
    const [loraDropoutVal, setLoraDropoutVal] = useState("0");
    const [loraBiasVal, setLoraBiasVal] = useState("0");
    const [epochsVal, setEpochsVal] = useState("0");
    const [batchSizeVal, setBatchSizeVal] = useState("0");
    const [learningRateVal, setLearningRateVal] = useState("0");
    const [warmupStepsVal, setWarmupStepsVal] = useState("0");
    const [optimizerVal, setOptimizerVal] = useState<TInputOption[]>([]);
    const [lRSchedulerTypeVal, setLRSchedulerTypeVal] = useState<
        TInputOption[]
    >([]);
    const [earlyStoppingPatienceVal, setEarlyStoppingPatienceVal] =
        useState("0");
    const [gradientAccumulationStepsVal, setGradientAccumulationStepsVal] =
        useState("0");
    const [evalStepsVal, setEvalStepsVal] = useState("0");

    const [gradientCheckpointing, setGradientCheckpointing] =
        useState<boolean>(false);

    const [state, formAction] = useFormState<any, any>(createCharacterAction, {
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
                        <InputSelect
                            key="model_id"
                            id="model_id"
                            label="Model Name"
                            placeholder="Select Model"
                            name="model_id"
                            options={models}
                            required
                            errorMsg={state.errorMsg.model_id}
                            value={modelVal}
                            onChange={(val) => {
                                setModelVal(val);
                            }}
                        />
                        <InputSelect
                            key="fine_tuning_type"
                            id="fine_tuning_type"
                            label="Fine Tuning Type"
                            placeholder={`Select Fine Tuning Type`}
                            name="fine_tuning_type"
                            options={[
                                {
                                    label: "QLoRA",
                                    value: "QLoRA",
                                },
                                {
                                    label: "LoRA",
                                    value: "LoRA",
                                },
                            ]}
                            required
                            errorMsg={state.errorMsg.fine_tuning_type}
                            value={FineTuningTypeVal}
                            onChange={(val) => {
                                setFineTuningTypeVal(val);
                            }}
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
                                min={"0"}
                                steps={0.5}
                                label="lora_r"
                                value={loraRVal}
                                onChange={(e) => {
                                    setLoraRVal(e.target.value);
                                }}
                            />
                            <InputRange
                                key="lora_alpha"
                                id="lora_alpha"
                                name="lora_alpha"
                                max={1000}
                                min={"0"}
                                steps={0.5}
                                label="lora_alpha"
                                value={loraAlphaVal}
                                onChange={(e) => {
                                    setLoraAlphaVal(e.target.value);
                                }}
                            />
                            <InputRange
                                key="lora_dropout"
                                id="lora_dropout"
                                name="lora_dropout"
                                max={1000}
                                min={"0"}
                                steps={0.05}
                                label="lora_dropout"
                                value={loraDropoutVal}
                                onChange={(e) => {
                                    setLoraDropoutVal(e.target.value);
                                }}
                            />
                            <InputRange
                                key="lora_bias"
                                id="lora_bias"
                                name="lora_bias"
                                max={1000}
                                min={"0"}
                                steps={0.05}
                                label="lora_bias"
                                value={loraBiasVal}
                                onChange={(e) => {
                                    setLoraBiasVal(e.target.value);
                                }}
                            />
                            <InputText
                                key="adaptor_output_name"
                                name="adaptor_output_name"
                                id="adaptor_output_name"
                                label="Adaptor Output Name"
                                placeholder="Adaptor Output Name"
                                required
                                errorMsg={state.errorMsg.adaptor_output_name}
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
                                key="epochs"
                                id="epochs"
                                name="epochs"
                                max={1000}
                                min={"0"}
                                steps={0.5}
                                label="Epochs"
                                value={epochsVal}
                                onChange={(e) => {
                                    setEpochsVal(e.target.value);
                                }}
                            />
                            <InputRange
                                key="batch_size"
                                id="batch_size"
                                name="batch_size"
                                max={1000}
                                min={"0"}
                                steps={0.5}
                                label="Batch Size"
                                value={batchSizeVal}
                                onChange={(e) => {
                                    setBatchSizeVal(e.target.value);
                                }}
                            />
                            <InputRange
                                key="learning_rate"
                                id="learning_rate"
                                name="learning_rate"
                                max={1000}
                                min={"0"}
                                steps={0.0001}
                                label="Learning Rate"
                                value={learningRateVal}
                                onChange={(e) => {
                                    setLearningRateVal(e.target.value);
                                }}
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
                            />
                            <InputSelect
                                key="optimizer"
                                id="optimizer"
                                label="Optimizer"
                                placeholder={`Select Optimizer`}
                                name="optimizer"
                                options={[
                                    {
                                        label: "adamw_torch",
                                        value: "adamw_torch",
                                    },
                                ]}
                                required
                                errorMsg={state.errorMsg.optimizer}
                                value={optimizerVal}
                                onChange={(val) => {
                                    setOptimizerVal(val);
                                }}
                            />
                            <InputSelect
                                key="lr_scheduler_type"
                                id="lr_scheduler_type"
                                label="LR Scheduler Type"
                                placeholder={`Select LR Scheduler Type`}
                                name="lr_scheduler_type"
                                options={[
                                    {
                                        label: "constant",
                                        value: "constant",
                                    },
                                ]}
                                required
                                errorMsg={state.errorMsg.lr_scheduler_type}
                                value={lRSchedulerTypeVal}
                                onChange={(val) => {
                                    setLRSchedulerTypeVal(val);
                                }}
                            />
                            <InputRange
                                key="early_stopping_patience"
                                id="early_stopping_patience"
                                name="early_stopping_patience"
                                max={1000}
                                min={"0"}
                                steps={1}
                                label="Early Stopping Patience"
                                value={earlyStoppingPatienceVal}
                                onChange={(e) => {
                                    setEarlyStoppingPatienceVal(e.target.value);
                                }}
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
                            />
                            <InputRange
                                key="eval_steps"
                                id="eval_steps"
                                name="eval_steps"
                                max={1000}
                                min={"0"}
                                steps={1}
                                label="Eval Steps"
                                value={evalStepsVal}
                                onChange={(e) => {
                                    setEvalStepsVal(e.target.value);
                                }}
                            />
                            <InputToggle
                                value={gradientCheckpointing}
                                onChange={(e) => {
                                    setGradientCheckpointing((prev) => !prev);
                                }}
                                key={"gradient_checkpointing"}
                                id="gradient_checkpointing"
                                name="gradient_checkpointing"
                                label="Gradient Checkpointing"
                            />
                        </div>
                    </div>
                </div>
                {state.hasError && (
                    <p className="text-red-500 mt-4">Please check the input</p>
                )}
                <div className="mt-8">
                    <Button
                        type="button"
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
