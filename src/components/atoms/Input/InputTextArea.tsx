import React, { TextareaHTMLAttributes } from "react";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputFooter from "./InputFooter";
import InputErrorMessage from "./InputErrorMessage";

type TInputTextAreaProps = TInputProps & {
    rows?: number;
    value?: TextareaHTMLAttributes<HTMLInputElement>["value"];
    defaultValue?:
        | TextareaHTMLAttributes<HTMLInputElement>["defaultValue"]
        | null;
};

const defaultRows = 5;

const InputTextArea = (props: TInputTextAreaProps) => {
    const { rows } = props;

    const actualRows = rows ?? defaultRows;
    return (
        <div className="flex flex-col w-full">
            {props.label && (
                <InputLabel
                    label={props.label}
                    required={props.required}
                    labelClassName={props.customLabelClassName}
                    requiredClassName={props.customRequiredClassName}
                />
            )}
            {props.helperText && (
                <InputHelperText helperText={props.helperText} />
            )}
            <textarea
                id={props.id}
                className={` min-h-[${
                    1.3125 * actualRows
                }rem] ${defaultInputClassName} `} // line-height 1.3125rem
                placeholder={props.placeholder}
                value={props.value}
                defaultValue={props.defaultValue || undefined}
                rows={actualRows}
                name={props.name}
            />
            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}
            {props.footer && (
                <InputFooter className={props.customFooterClassName}>
                    {props.footer}
                </InputFooter>
            )}
        </div>
    );
};

export default InputTextArea;
