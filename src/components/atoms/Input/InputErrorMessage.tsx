import React from "react";

type TInputErrorMessageProps = {
    message: string[];
};

const InputErrorMessage = (props: TInputErrorMessageProps) => {
    return (
        <div className="text-xs text-red-500 font-medium mt-2 cursor-pointer">
            <p className="text-inherit">{props.message.join(", ")}</p>
        </div>
    );
};

export default InputErrorMessage;
