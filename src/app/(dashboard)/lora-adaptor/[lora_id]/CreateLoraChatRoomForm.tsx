"use client";

import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import React from "react";

type TCreateLoraChatRoomFormProps = {
    lora_id: string;
};

function CreateLoraChatRoomForm({ lora_id }: TCreateLoraChatRoomFormProps) {
    const router = useRouter();

    return (
        <div
            className="flex flex-row w-full left-0 items-center justify-center ml-[-1.75rem]"
            style={{
                backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity))",
            }}
        >
            <Button
                type="button"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky bottom-0"
                onClick={() => {
                    router.push(`/lora-adaptor/${lora_id}/chat-room`);
                }}
            >
                Start chat
            </Button>
        </div>
    );
}

export default CreateLoraChatRoomForm;
