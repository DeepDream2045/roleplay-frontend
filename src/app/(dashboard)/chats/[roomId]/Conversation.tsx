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
    const { socket, messages, waitForCharacterChat, isConnected } = useChat(
        roomData.user.id,
        roomData.character.id,
        roomData.chatroom
    );

    return (
        <>
            <ConversationHeader
                characterName={roomData.group_name}
                characterImage={roomData.character.image}
                socket={socket}
            />
            <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4 overflow-y-scroll">
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
                            typeSpeed={item.typeSpeed}
                        />
                    );
                })}
            </div>
            <ChatMessageBar
                socket={socket}
                waitForCharacterChat={waitForCharacterChat}
            />
        </>
    );
}
