"use client";

import { useEffect, useState } from "react";

type TLoraAdaptorChatRoomMessage = {
    messsage_from: "user" | "loraAdaptor";
    message_id: string;
    message: string[];
    sender_profile_pic: null;
    typeSpeed: number;
};

const useLoraAdaptorChat = () => {
    const [loraModelId, setLoraModelId] = useState<number | string>();

    const [messages, setMessages] = useState<TLoraAdaptorChatRoomMessage[]>([]);

    const [waitForLoraAdaptorChat, setWaitForLoraAdaptorChat] = useState(false);

    const onNewMessage = (response_message: string) => {
        const newMessage: TLoraAdaptorChatRoomMessage = {
            messsage_from: "loraAdaptor",
            message_id: `loraAdaptor-${new Date().getTime()}`,
            message: [response_message],
            sender_profile_pic: null,
            typeSpeed: 4,
        };

        setMessages((prev) => [newMessage, ...prev]);
        setWaitForLoraAdaptorChat(false);
    };

    const onSendMessage = (new_message: string) => {
        setWaitForLoraAdaptorChat(true);
        const newMessage: TLoraAdaptorChatRoomMessage = {
            messsage_from: "user",
            message_id: `user-${new Date().getTime()}`,
            message: [new_message],
            sender_profile_pic: null,
            typeSpeed: 4,
        };

        setMessages((prev) => [newMessage, ...prev]);
    };

    useEffect(() => {
        return () => {
            setMessages([]);
            setWaitForLoraAdaptorChat(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loraModelId]);

    return {
        messages,
        waitForLoraAdaptorChat,
        setLoraModelId,
        onNewMessage,
        onSendMessage,
        setWaitForLoraAdaptorChat,
    };
};

export default useLoraAdaptorChat;
