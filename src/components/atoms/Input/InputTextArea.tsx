import React from "react";
import type { TInputBaseProps } from "@/components/atoms/Input/InputType";

type TInputTextAreaProps = TInputBaseProps & { rows: number };

const InputTextArea = (props: TInputTextAreaProps) => {
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
            <textarea
                id={props.id}
                className={props.inputClassName}
                placeholder={props.placeholder}
                value={props.value}
                rows={props.rows}
                name={props.name}
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

export default InputTextArea;
