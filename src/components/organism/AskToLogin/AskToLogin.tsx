"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button";
import LoginModal from "./LoginModal";

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
            {modalShow && <LoginModal onClose={handleModal} />}
        </>
    );
}
