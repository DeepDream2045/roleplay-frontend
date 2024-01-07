"use client";

import { useState } from "react";
import InputForm from "@/app/components/InputForm";
import Button from "@/components/atoms/Button";
import ModalWrapper from "@/app/components/ModalWrapper";
import Link from "next/link";
import { X } from "lucide-react";

import { handleGoogleLogin } from "@/lib/authAction";

interface AskToLoginProps {
    title: string;
    subtitle: string;
}

export default function AskToLogin({ title, subtitle }: AskToLoginProps) {
    const [modalShow, setModalShow] = useState<Boolean>(false);

    const handleModal = () => {
        setModalShow((prev) => !prev);
    };

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center">
                <div className="flex flex-col max-w-screen-md">
                    <h1>{title}</h1>
                    <p className="text-base mt-8 font-normal">{subtitle}</p>
                    <Button
                        type="submit"
                        variant="fill"
                        color="primary"
                        size="medium"
                        className="mt-10"
                        onClick={handleModal}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
            {modalShow && (
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
                                        onClick={handleModal}
                                    />
                                </div>
                            </header>
                            <div className="flex flex-col py-2 px-6">
                                <div>
                                    <p className="text-base font-light">
                                        Sign in to use DreamTavern!
                                    </p>
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
                                <hr className="border-t" />
                                <form className="mt-4 flex flex-col">
                                    <InputForm
                                        type="email"
                                        id="login-email"
                                        label="Email"
                                        placeholder="Enter your email address"
                                    />
                                    <Button
                                        variant="fill"
                                        type="submit"
                                        color="primary"
                                        size="fullWidth"
                                        className="mt-4"
                                    >
                                        Sign in with email
                                    </Button>
                                </form>

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
