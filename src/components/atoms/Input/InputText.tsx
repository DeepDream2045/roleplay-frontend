import React, { InputHTMLAttributes } from "react";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputFooter from "./InputFooter";
import InputErrorMessage from "./InputErrorMessage";

type TInputTextProps = TInputProps & {
    value?: InputHTMLAttributes<HTMLInputElement>["value"];
    defaultValue?: InputHTMLAttributes<HTMLInputElement>["defaultValue"];
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    disabled?: boolean;
};

const InputText = (props: TInputTextProps) => {
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

            {props.value !== undefined ? (
                <input
                    id={props.id}
                    type="text"
                    placeholder={props.placeholder}
                    name={props.name}
                    className={`${
                        props.disabled ? "bg-[#b1aeae4d]" : ""
                    } ${defaultInputClassName}`}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    disabled={props.disabled}
                />
            ) : (
                <input
                    id={props.id}
                    type="text"
                    placeholder={props.placeholder}
                    name={props.name}
                    className={`${
                        props.disabled ? "bg-[#b1aeae4d]" : ""
                    } ${defaultInputClassName}`}
                    onChange={props.onChange}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                />
            )}

            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}

            {props.footer && (
                <InputFooter className={props.customFooterClassName}>
                    {props.footer}
                </InputFooter>
            )}
        </div>
    );
};

export default InputText;
