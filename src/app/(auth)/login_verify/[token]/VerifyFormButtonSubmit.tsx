"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function VerifyFormButtonSubmit({
    setPendingStatus,
}: {
    setPendingStatus: Dispatch<SetStateAction<Boolean>>;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (!pending) {
            btnRef?.current?.click();
        } else {
            setPendingStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pending]);

    return <button ref={btnRef} />;
}