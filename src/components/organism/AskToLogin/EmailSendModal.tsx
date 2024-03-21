import ModalWrapper from "@/app/components/ModalWrapper";
import { Mail, X } from "lucide-react";
import React from "react";

type EmailSendModalProps = {
    onClose: () => void;
};

function EmailSendModal({ onClose }: EmailSendModalProps) {
    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-col bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 max-w-md min-w-md rounded-lg">
                    <header className=" py-4 px-6 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2>Sign in</h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="flex flex-col py-2 px-6 items-center justify-center gap-8">
                        <Mail className="w-12 h-12 text-blue-500" />
                        <p className="text-center text-base cursor-default">
                            Check your email for a link to sign in. Your link
                            will expire in 10 minutes.
                        </p>
                        <p className="text-center text-base cursor-default">{`Can't find your email? Check your spam folder.`}</p>
                        <p
                            onClick={onClose}
                            className="text-blue-500 font-semibold cursor-pointer"
                        >
                            Back
                        </p>
                    </div>
                    <footer className="py-4 px-6"></footer>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default EmailSendModal;
