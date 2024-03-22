"use client";

import React, { FormHTMLAttributes, useState } from "react";
import { TInputOption } from "../Input/InputType";
import FormContainer from "./FormContainer";
import InputText from "../Input/InputText";
import InputTextArea from "../Input/InputTextArea";
import InputSelect from "../Input/InputSelect";
import InputRange from "../Input/InputRange";
import {
    LORA_BIAS_CHOICES,
    LORA_DATASET_PLACEHOLDER,
    LR_SCHEDULER_TYPE_CHOICES,
    OPTIMIZER_CHOICES,
} from "@/constants/constants";
import InputTextAreaWithUploadFile from "../Input/InputTextAreaWithUploadFile";
import Button from "../Button";
import { TLoraInfo } from "@/types/loraInfoAction";

export type LoraAdaptorInputFormProps = {
    formAction: FormHTMLAttributes<HTMLFormElement>["action"];
    state: any;
    models: TInputOption[];
    loraData: {
        lora_model_name?: string;
        lora_short_bio?: string;
        base_model_id?: TLoraInfo["base_model_id"];
        lora_r?: number;
        lora_alpha?: number;
        lora_dropout?: number;
        lora_bias?: string;
        dataset?: string;
        num_train_epochs?: number;
        per_device_train_batch_size?: number;
        learning_rate?: number;
        warmup_steps?: number;
        optimizer?: TLoraInfo["optimizer"];
        lr_scheduler_type?: TLoraInfo["lr_scheduler_type"];
        gradient_accumulation_steps?: number;
    };
};

const LoraAdaptorInputForm = (props: LoraAdaptorInputFormProps) => {
    const currentBaseModel = props.loraData.base_model_id
        ? props.models.find((val) => {
              return (
                  String(val.value) === String(props.loraData.base_model_id!.id)
              );
          })
        : undefined;

    const [baseModelVal, setBaseModelVal] = useState<TInputOption[]>(
        currentBaseModel ? [currentBaseModel] : []
    );

    const [loraRVal, setLoraRVal] = useState(props.loraData.lora_r || 8);
    const [loraAlphaVal, setLoraAlphaVal] = useState(
        props.loraData.lora_alpha || 32
    );
    const [loraDropoutVal, setLoraDropoutVal] = useState(
        props.loraData.lora_dropout || 0.05
    );
    const [loraBiasVal, setLoraBiasVal] = useState<TInputOption[]>(
        props.loraData.lora_bias
            ? [
                  {
                      label: props.loraData.lora_bias,
                      value: props.loraData.lora_bias,
                  },
              ]
            : [LORA_BIAS_CHOICES[0]]
    );
    const [epochsVal, setEpochsVal] = useState(
        props.loraData.num_train_epochs || 5
    );
    const [batchSizeVal, setBatchSizeVal] = useState(
        props.loraData.per_device_train_batch_size || 1
    );
    const [learningRateVal, setLearningRateVal] = useState(
        props.loraData.learning_rate || 0.0002
    );
    const [warmupStepsVal, setWarmupStepsVal] = useState(
        props.loraData.warmup_steps || 100
    );
    const [optimizerVal, setOptimizerVal] = useState<TInputOption[]>(
        props.loraData.optimizer
            ? [
                  {
                      label: props.loraData.optimizer,
                      value: props.loraData.optimizer,
                  },
              ]
            : [OPTIMIZER_CHOICES[1]]
    );
    const [lRSchedulerTypeVal, setLRSchedulerTypeVal] = useState<
        TInputOption[]
    >(
        props.loraData.lr_scheduler_type
            ? [
                  {
                      label: props.loraData.lr_scheduler_type,
                      value: props.loraData.lr_scheduler_type,
                  },
              ]
            : [LR_SCHEDULER_TYPE_CHOICES[0]]
    );

    const [gradientAccumulationStepsVal, setGradientAccumulationStepsVal] =
        useState(props.loraData.gradient_accumulation_steps || 1);

    return (
        <form
            action={props.formAction}
            className="flex flex-1 flex-col gap-10 py-5"
        >
            <FormContainer>
                <div className="flex flex-col flex-1 gap-7">
                    <div className="flex flex-col gap-1">
                        <p className="text-5 font-bold leading-normal">
                            1. Basic Info
                        </p>
                        <p className="text-sm font-normal leading-normal">
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
                        errorMsg={props.state.errorMsg.lora_model_name}
                        defaultValue={props.loraData.lora_model_name}
                    />
                    <InputTextArea
                        key="lora_short_bio"
                        id="lora_short_bio"
                        label="LoRA Model Description"
                        helperText="Description of your LoRA model"
                        placeholder="Lora Description"
                        name="lora_short_bio"
                        required
                        errorMsg={props.state.errorMsg.lora_short_bio}
                        rows={5}
                        defaultValue={props.loraData.lora_short_bio}
                    />
                    <InputSelect
                        key="base_model_id"
                        id="base_model_id"
                        label="LoRA Base Model"
                        placeholder="Select Model"
                        name="base_model_id"
                        options={props.models}
                        value={baseModelVal}
                        onChange={(val) => setBaseModelVal(val)}
                        required
                        errorMsg={props.state.errorMsg.base_model_id}
                    />
                </div>
            </FormContainer>

            <FormContainer>
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                        <p className="text-5 font-bold leading-normal ">
                            2. LoRA Config
                        </p>
                        <p className="text-sm font-normal leading-normal ">
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
                            setLoraRVal(parseInt(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.lora_r}
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
                            setLoraAlphaVal(parseInt(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.lora_alpha}
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
                            setLoraDropoutVal(parseFloat(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.lora_dropout}
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
                        errorMsg={props.state.errorMsg.lora_bias}
                    />
                </div>
            </FormContainer>

            <FormContainer>
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                        <p className="text-5 font-bold leading-normal ">
                            3. Dataset
                        </p>
                        <p className="text-sm font-normal leading-normal ">
                            Your dataset File for finetune the model
                        </p>
                    </div>
                    <InputTextAreaWithUploadFile
                        id="dataset"
                        name="dataset"
                        label="Dataset"
                        rows={10}
                        errorMsg={props.state.errorMsg.dataset}
                        placeholder={LORA_DATASET_PLACEHOLDER}
                        defaultValue={props.loraData.dataset}
                        acceptedFile={["application/json"]}
                        helperText={`File allowed to upload is .json file and should be contain minimum 50 data`}
                    />
                </div>
            </FormContainer>

            <FormContainer>
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                        <p className="text-5 font-bold leading-normal ">
                            4. Training Argument
                        </p>
                        <p className="text-sm font-normal leading-normal ">
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
                            setEpochsVal(parseInt(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.num_train_epochs}
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
                            setBatchSizeVal(parseInt(e.target.value));
                        }}
                        errorMsg={
                            props.state.errorMsg.per_device_train_batch_size
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
                            setLearningRateVal(parseFloat(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.learning_rate}
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
                            setWarmupStepsVal(parseInt(e.target.value));
                        }}
                        errorMsg={props.state.errorMsg.warmup_steps}
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
                        errorMsg={props.state.errorMsg.optimizer}
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
                        errorMsg={props.state.errorMsg.lr_scheduler_type}
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
                            props.state.errorMsg.gradient_accumulation_steps
                        }
                    />
                </div>
            </FormContainer>

            {props.state.hasError && (
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
};

export default LoraAdaptorInputForm;
