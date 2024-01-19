import React, { HTMLAttributes } from "react";

type TInputHelperTextProps = {
    helperText: string;
    className?: HTMLAttributes<HTMLDivElement>["className"];
};
export const defaultHelperTextClassName = "text-neutral-500 text-sm mt-2";

const InputHelperText = ({ helperText, className }: TInputHelperTextProps) => {
    return (
        <div className={`${defaultHelperTextClassName} ${className || ""}`}>
            {helperText}
        </div>
    );
};

export default InputHelperText;
