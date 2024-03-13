"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";
import GoogleLoginForm from "./GoogleLoginForm";
import MagicLinkLoginForm from "./MagicLinkLoginForm";
import EmailSendModal from "./EmailSendModal";

interface LoginModalProps {
    onClose: () => void;
}

function LoginModal({ onClose }: LoginModalProps) {
    const [showEmailSent, setShowEmailSent] = useState(false);

    return (
        <>
            {showEmailSent ? (
                <EmailSendModal onClose={onClose} />
            ) : (
                <ModalWrapper>
                    <div
                        className="flex flex-col flex-1 justify-center items-center px-4 sm:px-8"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
                    >
                        <div className="flex flex-col w-full bg-white-0 sm:max-w-md sm:min-w-md rounded-lg">
                            <header className="py-4 px-6 ">
                                <div className="h-10 flex flex-row justify-between items-center">
                                    <h2>Sign in</h2>
                                    <X
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={onClose}
                                    />
                                </div>
                            </header>
                            <div className="flex flex-col py-2 px-6">
                                <GoogleLoginForm />
                                <hr className="border-1 mt-4" />
                                <MagicLinkLoginForm
                                    afterEmailSent={setShowEmailSent}
                                />

                                <p className="pt-10 text-sm">
                                    By signing in, you agree to our{" "}
                                    <Link
                                        href="/terms"
                                        className="text-blue-500"
                                    >
                                        terms of service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="text-blue-500"
                                    >
                                        privacy policy
                                    </Link>
                                    .
                                </p>
                            </div>
                            <footer className="py-4 px-6"></footer>
                        </div>
                    </div>
                </ModalWrapper>
            )}
        </>
    );
}

export default LoginModal;
