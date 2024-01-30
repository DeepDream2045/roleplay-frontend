"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function VerifyFormButtonSubmit({
    setPendingStatus,
    state,
}: {
    setPendingStatus: Dispatch<SetStateAction<Boolean>>;
    state: any;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (!pending && !state?.isNotValid) {
            btnRef?.current?.click();
            setPendingStatus(true);
        } else if (!pending && state?.isNotValid) {
            setPendingStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pending]);

    return <button ref={btnRef} />;
}
