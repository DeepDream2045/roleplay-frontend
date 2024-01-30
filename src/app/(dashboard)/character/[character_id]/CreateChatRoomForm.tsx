"use client";
import Button from "@/components/atoms/Button";
import { createRoomInfoAction } from "@/lib/chatAction";
import React from "react";
import { useFormState } from "react-dom";

type TCreateChatRoomFormProps = {
    character_id: string;
};

function CreateChatRoomForm({ character_id }: TCreateChatRoomFormProps) {
    const bindCharacterId = createRoomInfoAction.bind(null, character_id);

    const [state, formAction] = useFormState(bindCharacterId, null);

    return (
        <form className="absolute bottom-4" action={formAction}>
            <Button
                type="submit"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky bottom-0"
            >
                Start chat
            </Button>
        </form>
    );
}

export default CreateChatRoomForm;
