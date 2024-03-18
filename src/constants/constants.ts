import { TInputOption } from "@/components/atoms/Input/InputType";

export const GUEST_DATA_LOCAL_STORAGE_KEY = "guest_data";
export const GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY = "guest_chat_room_data";

export const LORA_BIAS_CHOICES: TInputOption[] = [
    { label: "none", value: "none" },
    { label: "all", value: "all" },
    { label: "lora_only", value: "lora_only" },
] as const;

export const LR_SCHEDULER_TYPE_CHOICES: TInputOption[] = [
    { label: "constant", value: "constant" },
    { label: "linear", value: "linear" },
    { label: "cosine", value: "cosine" },
    { label: "cosine_with_restarts", value: "cosine_with_restarts" },
    { label: "polynomial", value: "polynomial" },
    { label: "constant_with_warmup", value: "constant_with_warmup" },
    { label: "inverse_sqrt", value: "inverse_sqrt" },
    { label: "reduce_lr_on_plateau", value: "reduce_lr_on_plateau" },
];

export const OPTIMIZER_CHOICES: TInputOption[] = [
    { label: "adamw_hf", value: "adamw_hf" },
    { label: "adamw_torch", value: "adamw_torch" },
    { label: "adamw_torch_fused", value: "adamw_torch_fused" },
    { label: "adamw_torch_xla", value: "adamw_torch_xla" },
    { label: "adamw_torch_npu_fused", value: "adamw_torch_npu_fused" },
    { label: "adamw_apex_fused", value: "adamw_apex_fused" },
    { label: "adafactor", value: "adafactor" },
    { label: "adamw_anyprecision", value: "adamw_anyprecision" },
    { label: "sgd", value: "sgd" },
    { label: "adagrad", value: "adagrad" },
    { label: "adamw_bnb_8bit", value: "adamw_bnb_8bit" },
    { label: "adamw_8bit", value: "adamw_8bit" },
    { label: "lion_8bit", value: "lion_8bit" },
    { label: "lion_32bit", value: "lion_32bit" },
    { label: "paged_adamw_32bit", value: "paged_adamw_32bit" },
    { label: "paged_adamw_8bit", value: "paged_adamw_8bit" },
    { label: "paged_lion_32bit", value: "paged_lion_32bit" },
    { label: "paged_lion_8bit", value: "paged_lion_8bit" },
    { label: "rmsprop", value: "rmsprop" },
];

export const LORA_DATASET_PLACEHOLDER = `[
    {
        "context":"What's your favorite hobby?",
        "response":"I'm passionate about entrepreneurship, technology, and space exploration. How about you?
    }
]
`;

export const CHATBOT_PROMPT_PLACEHOLDER = `Name:Bulma
Body: Bulma is a 16-year-old girl with green hair  in a braided ponytail with a red ribbon and milky colored skin.
Mind: Bulma is a complex character, balancing tomboyish and girly traits alongside a temperamental nature. She surprises with her friendliness and helpfulness, approaching major decisions rationally, displaying persistence in achieving her goals...`;

export type TLORA_TRAIN_STATUS_BG_COLOR = {
    failed: string;
    pending: string;
    trained: string;
    untrained: string;
};
export const LORA_TRAIN_STATUS_BG_COLOR: TLORA_TRAIN_STATUS_BG_COLOR = {
    failed: "bg-red-200",
    pending: "bg-yellow-200",
    trained: "bg-green-200",
    untrained: "bg-black-200",
};
