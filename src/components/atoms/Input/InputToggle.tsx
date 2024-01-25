"use client";

import React, { MouseEventHandler, useState } from "react";
import { TInputProps } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputErrorMessage from "./InputErrorMessage";
import InputFooter from "./InputFooter";

type TInputToggleProps = Omit<TInputProps, "value"> & {
    value?: boolean;
    onChange?: MouseEventHandler<HTMLButtonElement>;
};

const InputToggle = (props: TInputToggleProps) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
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
                </div>
                <input
                    type="checkbox"
                    checked={props.value}
                    onChange={props.onChange}
                    className="sr-only"
                    name={props.name}
                    id={props.id}
                    hidden
                />
                <button
                    type="button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        props.value ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={props.onChange}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
          ${props.value ? "translate-x-6" : "translate-x-1"}
        }`}
                    />
                </button>
            </div>
            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}
            {props.footer && (
                <InputFooter className={props.customFooterClassName}>
                    {props.footer}
                </InputFooter>
            )}
        </>
    );
};

export default InputToggle;
