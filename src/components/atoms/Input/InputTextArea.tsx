import React, { TextareaHTMLAttributes } from "react";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputFooter from "./InputFooter";
import InputErrorMessage from "./InputErrorMessage";

type TInputTextAreaProps = TInputProps & {
    rows?: number;
    value?: TextareaHTMLAttributes<HTMLInputElement>["value"];
};

const defaultRows = 3;

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
                className={`${defaultInputClassName} `}
                placeholder={props.placeholder}
                value={props.value}
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
