"use client";

import React from "react";

import type {
    TInputOption,
    TInputBaseProps,
} from "@/components/atoms/Input/InputType";

type TInputSelectProps = TInputBaseProps & {
    options: TInputOption[];
};

const InputSelect = (props: TInputSelectProps) => {
    return (
        <div>
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
            <select
                id={props.id}
                name={props.name}
                className={`${props.inputClassName} h-10`}
                value={props.value}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
