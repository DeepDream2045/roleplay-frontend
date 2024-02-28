import React, { InputHTMLAttributes } from "react";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputFooter from "./InputFooter";
import InputErrorMessage from "./InputErrorMessage";

type TInputRangeProps = TInputProps & {
    value?: InputHTMLAttributes<HTMLInputElement>["value"];
    defaultValue?: InputHTMLAttributes<HTMLInputElement>["defaultValue"];
    min?: InputHTMLAttributes<HTMLInputElement>["min"];
    max?: InputHTMLAttributes<HTMLInputElement>["max"];
    steps?: InputHTMLAttributes<HTMLInputElement>["step"];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const InputRange = (props: TInputRangeProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center mb-2">
                {props.label && (
                    <InputLabel
                        label={props.label}
                        required={props.required}
                        labelClassName={props.customLabelClassName}
                        requiredClassName={props.customRequiredClassName}
                    />
                )}
                <span className="w-24 flex justify-center py-1 border font-semibold text-sm rounded-lg border-blue-700">
                    {props.value}
                </span>
            </div>
            {props.helperText && (
                <InputHelperText helperText={props.helperText} />
            )}

            <div className="flex items-center">
                <input
                    id={props.id}
                    type="range"
                    name={props.name}
                    className={`${defaultInputClassName} cursor-pointer`}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    min={props.min}
                    max={props.max}
                    step={props.steps}
                    onChange={props.onChange}
                />
            </div>

            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}

            {props.footer && (
                <InputFooter className={props.customFooterClassName}>
                    {props.footer}
                </InputFooter>
            )}
        </div>
    );
};

export default InputRange;