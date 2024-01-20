"use client";

import React, { MouseEventHandler, useState } from "react";
import { TInputProps } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";

type TInputToggleProps = Omit<TInputProps, "value"> & {
    value?: boolean;
    onChange?: MouseEventHandler<HTMLButtonElement>;
};

const InputToggle = (props: TInputToggleProps) => {
    return (
        <div className="flex flex-row justify-between">
            <div>
                {props.label && <InputLabel label={props.label} />}
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
    );
};

export default InputToggle;
