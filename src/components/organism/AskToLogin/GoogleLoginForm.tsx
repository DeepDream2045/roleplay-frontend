import Button from "@/components/atoms/Button";
import React from "react";

import { handleGoogleLogin } from "@/lib/authAction";

function GoogleLoginForm() {
    return (
        <div>
            <p className="text-base font-light">Sign in to use DreamTavern!</p>
            <form action={handleGoogleLogin}>
                <Button
                    variant="custom"
                    color="custom"
                    size="custom"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                    type="submit"
                >
                    Sign in with Google
                </Button>
            </form>
        </div>
    );
}

export default GoogleLoginForm;
