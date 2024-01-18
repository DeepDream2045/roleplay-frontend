import React from "react";
import type { TInputBaseProps } from "@/components/atoms/Input/InputType";

type TInputTextProps = TInputBaseProps;

const InputText = (props: TInputTextProps) => {
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
                type="text"
                placeholder={props.placeholder}
                name={props.name}
                className={props.inputClassName}
                value={props.value}
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

export default InputText;
