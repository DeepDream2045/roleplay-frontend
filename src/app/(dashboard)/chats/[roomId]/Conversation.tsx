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
        roomData.user,
        roomData.character,
        roomData.chatroom
    );
    const [waitForResponse, setWaitForResponse] = useState<boolean>(false);

    useEffect(() => {
        console.log({ messages });
    }, [messages]);

    useEffect(() => {
        console.log(conversations);
    }, [conversations]);

    return (
        <>
            <ConversationHeader />
            <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4">
                {messages.map((item) => {
                    return (
                        <MessageComponent
                            key={`user-${item.message_id}`}
                            message={item.message}
                            imageSrc={item.sender_profile_pic || ""}
                            rigth={item.messsage_from === "user"}
                        />
                    );
                })}
            </div>
            <ChatMessageBar socket={socket} />
        </>
    );
}
