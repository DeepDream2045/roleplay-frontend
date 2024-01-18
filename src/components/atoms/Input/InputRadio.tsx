import React from "react";
import type {
    TInputOption,
    TInputBaseProps,
} from "@/components/atoms/Input/InputType";

type TInputRadioProps = TInputBaseProps & {
    options: TInputOption[];
};

const InputRadio = (props: TInputRadioProps) => {
    return (
        <>
            <div className={props.labelClassName}>
                {props.label}
                {props.required && (
                    <span className={props.requiredClassName}> *</span>
                )}{" "}
            </div>
            {props.helperText && (
                <div className={props.helperTextClassName}>
                    {props.helperText}
                </div>
            )}
            <div className="flex flex-col gap-2 mt-2">
                {props.options?.map((option) => (
                    <div className="flex items-center" key={option.value}>
                        <input
                            id={`radio-${option.value}`}
                            type="radio"
                            name={props.name}
                            value={option.value}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            required
                            checked={props.value === option.value}
                            onChange={(e) => {
                                props.onChange(e.currentTarget.value);
                            }}
                        />

                        <label
                            htmlFor={`radio-${option.value}`}
                            className="ml-2 text-gray-700"
                        >
                            <span className="text-base font-normal">
                                {option.label}
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
};

export default InputRadio;
