"use client";

import React from "react";
import Button from "@/components/atoms/Button";
import { useFormStatus } from "react-dom";

function LogoutSubmit() {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="fill"
            type="submit"
            color="primary"
            size="fullWidth"
            disabled={pending}
        >
            {pending ? "Loading" : "Sign out"}
        </Button>
    );
}

export default LogoutSubmit;
