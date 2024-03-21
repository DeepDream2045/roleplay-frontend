import React, { HTMLAttributes } from "react";

type FormContainerProps = {
    children: React.ReactNode;
    fullWidth?: boolean;
    customClass?: HTMLAttributes<HTMLDivElement>["className"];
};

const FormContainer = (props: FormContainerProps) => {
    return (
        <div
            className={`flex flex-col rounded-lg bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 p-4 ${
                props.fullWidth ? "flex-grow" : ""
            } ${props.customClass ? props.customClass : ""} `}
        >
            {props.children}
        </div>
    );
};

export default FormContainer;
