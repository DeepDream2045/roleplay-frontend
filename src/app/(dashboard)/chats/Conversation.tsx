"use client";

import MessageComponent from "./MessageComponent";
import useChat from "@/lib/useChat";
import ChatList from "./ChatList";
import ChatMessageBar from "./ChatMessageBar";
import ConversationHeader from "./ConversationHeader";
import { useEffect, useState } from "react";

export default function Conversation() {
    const { socket, messages } = useChat(1, 1);
    const [waitForResponse, setWaitForResponse] = useState<boolean>(false);

    useEffect(() => {
        console.log({ messages });
    }, [messages]);

    useEffect(() => {
        if (!socket) return;
    }, [socket]);

    return (
        <div className="flex flex-1 flex-row w-full">
            <ChatList />
            {/* Message List Container */}
            <div className="flex flex-1 flex-col">
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
            </div>
        </div>
    );
}
