"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const CharacterEditSubmitButton = (props: Props) => {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className={`w-full h-10 rounded-lg ${
                pending ? "bg-blue-100" : "bg-blue-500"
            } text-white font-semibold `}
        >
            {pending ? "Loading..." : "Update Character"}
        </button>
    );
};

export default CharacterEditSubmitButton;
