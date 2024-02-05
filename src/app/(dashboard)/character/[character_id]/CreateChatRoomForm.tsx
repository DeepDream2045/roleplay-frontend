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
        <form
            className="flex flex-row w-full left-0 items-center justify-center ml-[-1.75rem]"
            action={formAction}
            style={{
                backgroundColor: "rgb(250 250 250 / var(--tw-bg-opacity))",
            }}
        >
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
