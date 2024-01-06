"use client";

import { useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import ModalWrapper from "../components/ModalWrapper";
import Link from "next/link";
import { X } from "lucide-react";

export default function AskToLogin() {
    const [modalShow, setModalShow] = useState<Boolean>(false);

    const handleModal = () => {
        setModalShow((prev) => !prev);
    };

    return (
        <>
            <div className="flex flex-col flex-1 items-center justify-center">
                <div className="flex flex-col max-w-screen-md">
                    <h2 className="font-bold text-3xl leading-snug">
                        Sign in to create new AI characters
                    </h2>
                    <p className="text-base mt-8 font-normal">
                        Once you sign in, you can create new AI characters to
                        talk to and interact.
                    </p>
                    <button
                        type="button"
                        className="h-10 px-4 w-fit rounded-lg bg-blue-500 text-white font-semibold mt-10"
                        onClick={handleModal}
                    >
                        Sign in
                    </button>
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
                                    <h2 className="text-xl leading-normal font-semibold">
                                        Sign in
                                    </h2>
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
                                    <Button className="mt-4 bg-white text-gray-500 border border-gray-400">
                                        Sign in with google
                                    </Button>
                                </div>
                                <hr className="border-t" />
                                <form className="mt-4 flex flex-col">
                                    <InputForm
                                        type="email"
                                        id="login-email"
                                        label="Email"
                                        placeholder="Enter your email address"
                                    />
                                    <Button className="mt-4">
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
