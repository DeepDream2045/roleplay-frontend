import { LabelHTMLAttributes } from "react";
import type {
    TInputBaseProps,
    TInputOption,
} from "@/components/atoms/Input/InputType";
import InputRadio from "./InputRadio";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";
import InputEmail from "./InputEmail";
import InputSelect from "./InputSelect";

type OmitClassNames<T> = Pick<T, Exclude<keyof T, `${string}ClassName`>>;
type TInputAdditionalProps = {
    isMulti?: boolean;
    type: "text" | "textarea" | "radio" | "email" | "select";
    rows?: number;
    options?: TInputOption[];
};
type TInputFormProps = OmitClassNames<TInputBaseProps> & TInputAdditionalProps;

export default function InputForm(props: TInputFormProps) {
    const labelClassName: LabelHTMLAttributes<HTMLElement>["className"] =
        "font-semibold text-sm";

    const requiredClassName = "text-red-500";

    const helperTextClassName = "text-neutral-500 text-sm mt-2";
    let inputClassName =
        "w-full mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

    const newProps: TInputBaseProps & TInputAdditionalProps = { ...props };

    if (props.type === "textarea") {
        inputClassName += " min-h-[6rem] resize-none";
    } else {
        inputClassName += " h-10";
    }

    const footerFieldTextClassName =
        "text-xs text-blue-500 font-medium mt-2 cursor-pointer ";

    newProps.labelClassName = labelClassName;
    newProps.requiredClassName = requiredClassName;
    newProps.helperTextClassName = helperTextClassName;
    newProps.inputClassName = inputClassName;
    newProps.footerFieldTextClassName = footerFieldTextClassName;

    return (
        <div className="w-full">
            {props.type === "radio" && (
                <InputRadio options={newProps.options!} {...newProps} />
            )}

            {props.type === "text" && <InputText {...newProps} />}
            {props.type === "email" && <InputEmail {...newProps} />}

            {props.type === "textarea" && (
                <InputTextArea rows={newProps.rows!} {...newProps} />
            )}

            {props.type === "select" && (
                <InputSelect options={newProps.options!} {...newProps} />
            )}
        </div>
    );
}
