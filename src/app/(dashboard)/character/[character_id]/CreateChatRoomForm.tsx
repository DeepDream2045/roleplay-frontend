"use client";
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
        <form action={formAction}>
            <button className="text-sm h-10 px-4 w-fit rounded-lg font-semibold leading-normal text-white bg-blue-500 min-w-72">
                Start chat
            </button>
            {/* <Button
                type="submit"
                variant="fill"
                color="primary"
                size="medium"
                className="min-w-72 sticky bottom-0"
            >
                Start chat
            </Button> */}
        </form>
    );
}

export default CreateChatRoomForm;
