import React, { HTMLAttributes } from "react";

type TInputHelperTextProps = {
    helperText: string;
    className?: HTMLAttributes<HTMLDivElement>["className"];
};
export const defaultHelperTextClassName =
    "text-sm font-normal leading-normal text-black-900 dark:text-white-200";

const InputHelperText = ({ helperText, className }: TInputHelperTextProps) => {
    return (
        <div className={`${defaultHelperTextClassName} ${className || ""}`}>
            {helperText}
        </div>
    );
};

export default InputHelperText;
