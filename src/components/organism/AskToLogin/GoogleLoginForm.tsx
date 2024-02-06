"use client";

import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React from "react";

// import { handleGoogleLogin } from "@/lib/authAction";

function GoogleLoginForm() {
    const router = useRouter();
    return (
        <div>
            <p className="text-base font-light">Sign in to use!</p>
            <form>
                <Button
                    variant="custom"
                    color="custom"
                    size="custom"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                    type="button"
                    onClick={() => {
                        router.push(`/api/auth/google`);
                    }}
                >
                    Sign in with Google
                </Button>
            </form>
        </div>
    );
}

export default GoogleLoginForm;
