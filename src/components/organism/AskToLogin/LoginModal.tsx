import ModalWrapper from "@/app/components/ModalWrapper";
import Link from "next/link";
import React from "react";
import { X } from "lucide-react";
import GoogleLoginForm from "./GoogleLoginForm";
import MagicLinkLoginForm from "./MagicLinkLoginForm";

interface LoginModalProps {
    onClose: () => void;
}

function LoginModal({ onClose }: LoginModalProps) {
    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-col bg-white max-w-md rounded-lg">
                    <header className=" py-4 px-6 ">
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
                        <hr className="border-t" />
                        <MagicLinkLoginForm />

                        <p className="pt-10 text-sm">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="text-blue-500">
                                terms of service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-500">
                                privacy policy
                            </Link>
                            .
                        </p>
                    </div>
                    <footer className="py-4 px-6"></footer>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default LoginModal;
