"use client";

import InputForm from "@/app/components/InputForm";
import { magicLinkRequestService } from "@/lib/magicLinkAction";
import React from "react";
import { useFormState } from "react-dom";
import MagicLinkLoginSubmit from "./MagicLinkLoginSubmit";

function MagicLinkLoginForm() {
    const [state, formAction] = useFormState<any, any>(
        magicLinkRequestService,
        {
            message: null,
        }
    );

    return (
        <form className="mt-4 flex flex-col" action={formAction}>
            <InputForm
                type="email"
                id="login-email"
                label="Email"
                name="email"
                placeholder="Enter your email address"
            />
            <MagicLinkLoginSubmit />
        </form>
    );
}

export default MagicLinkLoginForm;
