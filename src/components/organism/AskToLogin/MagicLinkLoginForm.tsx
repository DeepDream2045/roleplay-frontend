"use client";

import InputForm from "@/app/components/InputForm";
import { magicLinkRequestService } from "@/lib/magicLinkAction";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import MagicLinkLoginSubmit from "./MagicLinkLoginSubmit";

type MagicLinkLoginFormProps = {
    afterEmailSent: Dispatch<SetStateAction<boolean>>;
};

function MagicLinkLoginForm({ afterEmailSent }: MagicLinkLoginFormProps) {
    const [state, formAction] = useFormState<any, any>(
        magicLinkRequestService,
        {
            formSubmitted: false,
            emailSuccessSent: false,
        }
    );

    useEffect(() => {
        console.log({ state });

        if (state.emailSuccessSent) {
            afterEmailSent(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

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
