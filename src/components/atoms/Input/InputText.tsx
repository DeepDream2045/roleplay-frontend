import React, { InputHTMLAttributes } from "react";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputFooter from "./InputFooter";

type TInputTextProps = TInputProps & {
    value?: InputHTMLAttributes<HTMLInputElement>["value"];
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
            <input
                id={props.id}
                type="text"
                placeholder={props.placeholder}
                name={props.name}
                className={defaultInputClassName}
                value={props.value}
                onChange={props.onChange}
                defaultValue={""}
            />
            {props.footer && (
                <InputFooter className={props.customFooterClassName}>
                    {props.footer}
                </InputFooter>
            )}
        </div>
    );
};

export default InputText;
