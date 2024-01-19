import React, { HTMLAttributes, ReactNode } from "react";

export type TInputFooterProps = {
    children?: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
};

export const defaultFooterFieldTextClassName =
    "text-xs text-blue-500 font-medium mt-2 cursor-pointer";

const InputFooter = ({ children, className }: TInputFooterProps) => {
    return (
        <div
            className={`${defaultFooterFieldTextClassName} ${className || ""}`}
        >
            {children}
        </div>
    );
};

export default InputFooter;
