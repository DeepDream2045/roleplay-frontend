import { ChangeEventHandler, ReactNode } from "react";
import { TInputFooterProps } from "./InputFooter";
import { TInputLabel } from "./InputType";

type TInputProps = {
    id: string;
    name: string;
    label?: TInputLabel["label"];
    customLabelClassName?: TInputLabel["labelClassName"];
    required?: TInputLabel["required"];
    customRequiredClassName?: TInputLabel["requiredClassName"];
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    helperText?: string;
    errorMsg?: string;
    footer?: ReactNode;
    customFooterClassName?: TInputFooterProps["className"];
};

const defaultInputClassName = "border border-gray-400 text-sm rounded p-2";

let inputClassName =
    "w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

export type { TInputProps };
export { defaultInputClassName, inputClassName };
