"use client";

import Button from "@/components/atoms/Button";
import LoginModal from "@/components/organism/AskToLogin/LoginModal";
import React, { useState } from "react";

type Props = {};

const AskToLoginCreateChat = (props: Props) => {
    const [modalShow, setModalShow] = useState<Boolean>(false);

    const handleModal = () => {
        setModalShow((prev) => !prev);
    };
    return (
        <div
            className="flex flex-row w-full left-0 items-center justify-center ml-[-1.75rem]"
            style={{
                backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity))",
            }}
        >
            <Button
                type="submit"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky bottom-4"
                onClick={handleModal}
            >
                Sign in to start chatting
            </Button>
            {modalShow && <LoginModal onClose={handleModal} />}
        </div>
    );
};

export default AskToLoginCreateChat;
