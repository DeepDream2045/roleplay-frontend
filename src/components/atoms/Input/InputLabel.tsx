import React, { HTMLAttributes } from "react";

export type TInputLabelProps = {
    notLabel?: boolean | false;
    label: string;
    required?: boolean | false;
    labelClassName?: HTMLAttributes<HTMLDivElement>["className"];
    requiredClassName?: HTMLAttributes<HTMLSpanElement>["className"];
};

const InputLabel = ({
    notLabel = false,
    label,
    required = false,
    labelClassName,
    requiredClassName,
}: TInputLabelProps) => {
    const defaultLabelClassName = "font-semibold text-sm";
    const defaultRequiredClassName = "text-red-500";

    if (notLabel) {
        return (
            <div className={`${defaultLabelClassName} ${labelClassName || ""}`}>
                {label}
                {required && (
                    <span
                        className={`${defaultRequiredClassName} ${
                            requiredClassName || ""
                        }`}
                    >
                        {" "}
                        *
                    </span>
                )}{" "}
            </div>
        );
    }

    return (
        <label className={`${defaultLabelClassName}`}>
            {label}
            {required && (
                <span className={`${defaultRequiredClassName}`}> *</span>
            )}{" "}
        </label>
    );
};

export default InputLabel;
