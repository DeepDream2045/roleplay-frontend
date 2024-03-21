import React from "react";
import type { TInputOption } from "@/components/atoms/Input/InputType";
import { TInputProps } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputErrorMessage from "./InputErrorMessage";
import InputFooter from "./InputFooter";

type TInputRadioProps = Omit<TInputProps, "onChange"> & {
    options: TInputOption[];
    onChange: (val: TInputOption["value"]) => void;
};

const InputRadio = (props: TInputRadioProps) => {
    return (
        <>
            {props.label && (
                <InputLabel
                    label={props.label}
                    required={props.required}
                    labelClassName={props.customLabelClassName}
                    requiredClassName={props.customRequiredClassName}
                    notLabel
                />
            )}
            {props.helperText && (
                <InputHelperText helperText={props.helperText} />
            )}
            <div className="flex flex-col gap-2 mt-2">
                {props.options?.map((option) => (
                    <div className="flex items-center" key={option.value}>
                        <input
                            id={`radio-${option.value}`}
                            type="radio"
                            name={props.name}
                            value={option.value}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            required
                            checked={props.value === option.value}
                            onChange={(e) => {
                                props.onChange(e.currentTarget.value);
                            }}
                        />

                        <label
                            htmlFor={`radio-${option.value}`}
                            className="ml-2 text-black-900 dark:text-white-200"
                        >
                            <span className="text-base font-normal">
                                {option.label}
                            </span>
                        </label>
                    </div>
                ))}
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

export default InputRadio;
