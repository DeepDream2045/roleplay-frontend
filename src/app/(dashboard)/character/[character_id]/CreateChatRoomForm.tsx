"use client";

import Button from "@/components/atoms/Button";
import { GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY } from "@/constants/constants";
import { createRoomInfoAction } from "@/lib/chatAction";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

type TCreateChatRoomFormProps = {
    character_id: string;
    initialMessage?: string | null;
};

function CreateChatRoomForm({
    character_id,
    initialMessage,
}: TCreateChatRoomFormProps) {
    const router = useRouter();
    const bindCharacterId = createRoomInfoAction.bind(null, character_id);

    const [state, formAction] = useFormState(bindCharacterId, null);

    useEffect(() => {
        if (!state?.hasError && state?.data) {
            const chatRooms = JSON.parse(
                localStorage.getItem(GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY)!
            );

            const data = state.data;

            chatRooms.push({
                user: data!.user,
                character: data!.character,
                room_id: data!.room_id,
                group_name: data!.group_name,
                type: data!.type,
                chatroom: [
                    {
                        id: 100000,
                        created_date: new Date().toISOString(),
                        modified_date: new Date().toISOString(),
                        user_message: null,
                        character_message: initialMessage || "",
                        is_edited: false,
                        chat: 79,
                    },
                ],
            });

            localStorage.setItem(
                GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
                JSON.stringify(chatRooms)
            );

            router.push(`/chats/${data.room_id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, character_id]);
    return (
        <form
            className="flex flex-row w-full absolute bottom-0 items-center justify-center ml-[-1.75rem]"
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
