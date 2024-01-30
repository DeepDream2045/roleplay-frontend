"use client";

import { magicLinkVerifyServiceAction } from "@/lib/magicLinkAction";
import VerifyFormButtonSubmit from "./VerifyFormButtonSubmit";
import { useLayoutEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function VerifyForm({ token }: { token: string }) {
    const verifyToken = magicLinkVerifyServiceAction.bind(null, token);
    const [state, formAction] = useFormState(verifyToken, {
        isNotValid: false,
        message: null,
    });
    const [pendingStatus, setPendingStatus] = useState<Boolean>(false);

    useLayoutEffect(() => {}, [token]);
    return (
        <>
            {!pendingStatus && state.isNotValid && (
                <>
                    <h1>Ooops sorry error</h1>
                    <h2 className="font-normal">{state.message}</h2>
                </>
            )}
            {pendingStatus && <h1>Wait for a moment</h1>}
            <form action={formAction}>
                <VerifyFormButtonSubmit
                    state={state}
                    setPendingStatus={setPendingStatus}
                />
            </form>
        </>
    );
}
