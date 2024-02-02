"use client";

import MessageComponent from "./MessageComponent";
import useChat from "@/lib/useChat";
import ChatMessageBar from "./ChatMessageBar";
import ConversationHeader from "./ConversationHeader";
import { useEffect, useState } from "react";
import { TRoomInfo } from "@/lib/chatAction";

export default function Conversation({
    roomData,
    conversations,
}: {
    roomData: TRoomInfo;
    conversations?: any;
}) {
    const { socket, messages } = useChat(
        roomData.user.id,
        roomData.character.id,
        roomData.chatroom
    );

    const [waitForResponse, setWaitForResponse] = useState<boolean>(false);

    return (
        <>
            <ConversationHeader
                characterName={roomData.group_name}
                characterImage={roomData.character.image}
            />
            <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4">
                {messages.map((item) => {
                    const image =
                        item.messsage_from === "user"
                            ? ""
                            : roomData.character.image
                            ? `${roomData.character.image}`
                            : "/images/default-image-placeholder.webp";
                    return (
                        <MessageComponent
                            key={`user-${item.message_id}`}
                            message={item.message}
                            imageSrc={image}
                            rigth={item.messsage_from === "user"}
                        />
                    );
                })}
            </div>
            <ChatMessageBar socket={socket} />
        </>
    );
}
