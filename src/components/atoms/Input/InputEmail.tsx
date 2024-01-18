import React from "react";
import type { TInputBaseProps } from "@/components/atoms/Input/InputType";

type TInputEmailProps = TInputBaseProps;

const InputEmail = (props: TInputEmailProps) => {
    return (
        <>
            <label htmlFor={props.id} className={props.labelClassName}>
                {props.label}
                {props.required && (
                    <span className={props.requiredClassName}> *</span>
                )}{" "}
            </label>
            {props.helperText && (
                <div className={props.helperTextClassName}>
                    {props.helperText}
                </div>
            )}
            <input
                id={props.id}
                type="email"
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                className={props.inputClassName}
            />
            {props.footerFieldText && (
                <div
                    onClick={props.onFooterFieldClick}
                    className={props.footerFieldTextClassName}
                >
                    {props.footerFieldText}
                </div>
            )}
        </>
    );
};

export default InputEmail;
