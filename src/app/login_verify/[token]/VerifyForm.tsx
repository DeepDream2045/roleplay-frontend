"use client";

import { magicLinkVerifyServiceAction } from "@/lib/magicLinkAction";
import VerifyFormButtonSubmit from "./VerifyFormButtonSubmit";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function VerifyForm({ token }: { token: string }) {
    const verifyToken = magicLinkVerifyServiceAction.bind(null, token);
    const [state, formAction] = useFormState(verifyToken, {
        isNotValid: false,
        message: null,
    });
    const [pendingStatus, setPendingStatus] = useState<Boolean>(true);
    return (
        <>
            {!pendingStatus && state.isNotValid && <h1>Ooops sorry error</h1>}
            {pendingStatus && <h1>Wait for a moment</h1>}
            <form action={formAction}>
                <VerifyFormButtonSubmit setPendingStatus={setPendingStatus} />
            </form>
        </>
    );
}
