import { ChangeEventHandler, ReactNode } from "react";
import { TInputFooterProps } from "./InputFooter";
import { TInputLabelProps } from "./InputLabel";

type TInputProps = {
    id: string;
    name: string;
    label?: TInputLabelProps["label"];
    customLabelClassName?: TInputLabelProps["labelClassName"];
    required?: TInputLabelProps["required"];
    customRequiredClassName?: TInputLabelProps["requiredClassName"];
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    helperText?: string;
    errorMsg?: string[];
    footer?: ReactNode;
    customFooterClassName?: TInputFooterProps["className"];
};

let defaultInputClassName =
    "w-full mt-[0.75rem] px-2 py-2 min-h-10 text-sm leading-normal text-black-900 dark:text-white-200 placeholder:text-white-700 flex flex-row items-start border border-white-200 dark:border-black-900 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:ring-blue-700 focus:ring-opacity-50";

export type { TInputProps };
export { defaultInputClassName };
