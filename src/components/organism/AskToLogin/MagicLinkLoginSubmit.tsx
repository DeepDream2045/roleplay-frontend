"use client";

import React from "react";
import Button from "@/components/atoms/Button";
import { useFormStatus } from "react-dom";

function MagicLinkLoginSubmit() {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="fill"
            type="submit"
            color="primary"
            size="fullWidth"
            className="mt-4"
            disabled={pending}
        >
            {pending ? "Loading" : "Sign in with email"}
        </Button>
    );
}

export default MagicLinkLoginSubmit;
