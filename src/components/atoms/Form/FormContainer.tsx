import React from "react";

type FormContainerProps = {
    children: React.ReactNode;
    fullWidth?: boolean;
};

const FormContainer = (props: FormContainerProps) => {
    return (
        <div
            className={`flex flex-col rounded-lg bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 p-4 ${
                props.fullWidth ? "flex-grow" : ""
            } `}
        >
            {props.children}
        </div>
    );
};

export default FormContainer;
