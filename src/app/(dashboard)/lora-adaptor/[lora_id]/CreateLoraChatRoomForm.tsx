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
        <div className="flex flex-row w-screen-md left-0 items-center justify-center rounded-b-xl bg-white-0">
            <Button
                type="button"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky z-10 bottom-0"
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
