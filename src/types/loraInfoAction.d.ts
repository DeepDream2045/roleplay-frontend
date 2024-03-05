import {
    LORA_BIAS_CHOICES,
    LR_SCHEDULER_TYPE_CHOICES,
    OPTIMIZER_CHOICES,
} from "@/constants/constants";

export type TCreateLoraActionState = {
    hasError: true;
    errorMsg: any[];
};

export type TUpdateLoraActionState = {
    hasError: true;
    errorMsg: any[];
};

export type TDeleteLoraActionState = {
    hasError: true;
    errorMsg: any[];
};

export type TLoraFormPayload = {
    get(key: "lora_model_name"): string;
    get(key: "lora_short_bio"): string;
    get(key: "base_model_id"): number;
    get(key: "lora_r"): string | number;
    get(key: "lora_alpha"): string | number;
    get(key: "lora_dropout"): string | number;
    get(key: "lora_bias"): string;
    get(key: "dataset"): string;
    get(key: "num_train_epochs"): number;
    get(key: "per_device_train_batch_size"): number;
    get(key: "learning_rate"): number;
    get(key: "warmup_steps"): number;
    get(key: "optimizer"): string;
    get(key: "lr_scheduler_type"): string;
    get(key: "gradient_accumulation_steps"): number;
};

export type TCreateLoraFormBody = {
    lora_model_name: string;
    lora_short_bio: string;
    base_model_id: number;
    lora_r: number;
    lora_alpha: number;
    lora_dropout: number;
    lora_bias: string;
    dataset: string;
    num_train_epochs: number;
    per_device_train_batch_size: number;
    learning_rate: number;
    warmup_steps: number;
    optimizer: string;
    lr_scheduler_type: string;
    gradient_accumulation_steps: number;
};

export type TUpdateLoraFormBody = {
    id: number;
    lora_short_bio: string;
    lora_r: number;
    lora_alpha: number;
    lora_dropout: number;
    lora_bias: string;
    dataset: string;
    num_train_epochs: number;
    per_device_train_batch_size: number;
    learning_rate: number;
    warmup_steps: number;
    optimizer: string;
    lr_scheduler_type: string;
    gradient_accumulation_steps: number;
};

export type TCreateLoraResponse = {
    id: number;
    created_date: string;
    modified_date: string;
    lora_model_name: string;
    lora_short_bio: string;
    dataset_path: string;
    tuned_model_path: string;
    num_train_epochs: number;
    per_device_train_batch_size: number;
    learning_rate: number;
    warmup_steps: number;
    optimizer: string;
    lr_scheduler_type: string;
    gradient_accumulation_steps: number;
    lora_alpha: number;
    lora_dropout: number;
    lora_r: number;
    lora_bias: string;
    base_model_id: number;
    user: number;
};

export type TUpdateLoraResponse = {
    message: string;
};

type DatasetEntry = {
    context: string;
    response: string;
};

// Extract the 'value' type from LORA_BIAS_CHOICES
type LoraBiasOption = (typeof LORA_BIAS_CHOICES)[number]["value"];

// Extract the 'value' type from LR_SCHEDULER_TYPE_CHOICES
type LRSchedulerTypeOption =
    (typeof LR_SCHEDULER_TYPE_CHOICES)[number]["value"];

// Extract the 'value' type from OPTIMIZER_CHOICES
type OptimizerOption = (typeof OPTIMIZER_CHOICES)[number]["value"];

type TLoraInfo = {
    id: number;
    created_date: string;
    modified_date: string;
    lora_model_name: string;
    lora_short_bio: string;
    dataset: string; // If you plan to parse this JSON string, you could use `DatasetEntry[]` instead
    num_train_epochs: number;
    per_device_train_batch_size: number;
    learning_rate: number;
    warmup_steps: number;
    optimizer: OptimizerOption;
    lr_scheduler_type: LRSchedulerTypeOption;
    gradient_accumulation_steps: number;
    lora_alpha: number;
    lora_dropout: number;
    lora_r: number;
    lora_bias: LoraBiasOption;
    current_status: {
        id: number;
        lora_model_info: number;
        current_status: "pending" | "running" | "completed" | "error";
        lora_training_error: string;
    }[];
    base_model_id: {
        id: number;
        model_name: string;
        short_bio: string;
    };
    user: {
        id: number;
        full_name: string;
        username: string;
        profile_image: string;
    };
};

export type TGetLoraInfoResponse = {
    message: string;
    data: TLoraInfo[];
};

export type TgetLoraInfoActionReturn =
    | TGetLoraInfoResponse
    | {
          hasError: true;
          errorMsg: any[];
      }
    | undefined;

export type TLoraTrainingInfo = {
    id: number;
    created_date: string;
    modified_date: string;
    current_status: "pending" | "error" | "completed";
    lora_training_error: string;
    user: number;
    lora_model_info: number;
};

export type TGetLoraTrainingInfoResponse = {
    message: string;
    data: TLoraTrainingInfo[];
};

export type TGetLoraTrainingInfoActionReturn =
    | TGetLoraTrainingInfoResponse
    | {
          hasError: true;
          errorMsg: any[];
      }
    | undefined;

export type TLoraCompletedTrainingInfo = {
    id: number;
    created_date: string;
    modified_date: string;
    current_status: "completed";
    lora_training_error: string;
    user: number;
    lora_model_info: number;
};
export type TGetLoraCompletedTrainingListInfoResponse = {
    message: string;
    data: TLoraCompletedTrainingInfo[];
};
export type TGetLoraCompletedTrainingListInfoActionReturn =
    | TGetLoraCompletedTrainingListInfoResponse
    | {
          hasError: true;
          errorMsg: any[];
      }
    | undefined;

export type TSendMessageToLoraCompletedTrainingFormBody = {
    lora_model_id: number;
    user_text: string;
};

export type TSendMessageToLoraCompletedTrainingResponse = {
    response_message: string;
};

export type TSendMessageToLoraCompletedTrainingActionReturn =
    | TSendMessageToLoraCompletedTrainingResponse
    | {
          hasError: true;
          errorMsg: any;
      }
    | undefined;
