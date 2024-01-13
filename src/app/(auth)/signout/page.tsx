import NewCharacterLayout from "@/app/new-character/layout";
import Button from "@/components/atoms/Button";
import { logoutAction } from "@/lib/logoutAction";
import React from "react";
import LogoutSubmit from "./LogoutSubmit";

type SignoutPageProps = {};

function SignoutPage({}: SignoutPageProps) {
    return (
        <NewCharacterLayout>
            <div className="flex flex-1 flex-col justify-center items-center">
                <div className="flex flex-col items-center bg-white rounded-xl py-12 px-12 gap-8">
                    <h1>Signout</h1>
                    <p>Are you sure you want to sign out?</p>
                    <form action={logoutAction}>
                        <LogoutSubmit />
                    </form>
                </div>
            </div>
        </NewCharacterLayout>
    );
}

export default SignoutPage;
