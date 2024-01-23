"use client";

import { useEffect, useState } from "react";

const WEBSOCKET_API_BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_API_BASE_URL;
type TMessageResponse = {
    message_id: string;
    sender_user_message: string;
    character_message: string;
    sender_user_id: number;
    sender_email: string; // email
    sender_profile_pic: string | null;
    character_id: number;
    character_name: string;
    character_profile_pic: string | null;
};

type TMessage = {
    messsage_from: "user" | "character";
    message_id: string;
    message: string;
    sender_profile_pic: string | null;
};

const useChat = (userId: string | number, characterId: string | number) => {
    const [socket, setSocket] = useState<WebSocket>();
    const [messages, setMessages] = useState<TMessage[]>([]);

    useEffect(() => {
        const newSocket = new WebSocket(
            `${WEBSOCKET_API_BASE_URL}/${userId}/${characterId}`
        );

        newSocket.onerror = (err) => {
            console.error(err);
        };

        newSocket.onopen = () => {
            setSocket(newSocket);
        };

        newSocket.onmessage = (event) => {
            console.log("on message");
            console.log(event);
            const response: TMessageResponse = JSON.parse(event.data);
            const newMessage: TMessage = {
                messsage_from: "character",
                message_id: `character-${response.message_id}`,
                message: response.character_message,
                sender_profile_pic: response.character_profile_pic,
            };

            setMessages((prev) => [newMessage, ...prev]);
        };

        newSocket.onclose = () => {
            console.info(`${new Date()} - socket close`);
        };

        const send = newSocket.send;

        newSocket.send = (message) => {
            console.log("send message");
            console.log(message);
            const newMessage: TMessage = {
                messsage_from: "user",
                message_id: `user-${Date.now()}`,
                message: message as string,
                sender_profile_pic: "",
            };

            setMessages((prev) => [newMessage, ...prev]);
            send.call(
                newSocket,
                JSON.stringify({
                    text: message,
                })
            );
        };

        return () => {
            newSocket.close();
        };
    }, [userId, characterId]);

    return { socket, messages };
};

export default useChat;
