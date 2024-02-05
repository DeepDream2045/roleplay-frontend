"use client";

import { useEffect, useState } from "react";
import { TConversation } from "./chatAction";

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
    message: string[];
    sender_profile_pic: string | null;
    typeSpeed: number;
};

const useChat = (
    userId: string | number,
    characterId: string | number,
    historyConversation: TConversation[]
) => {
    const [socket, setSocket] = useState<WebSocket>();
    let historyConversationFormatted: TMessage[] = [];
    historyConversation.forEach((val) => {
        const newMessageUser: TMessage = {
            messsage_from: "user",
            message_id: `user-${val.id}`,
            message: [val.user_message] as string[],
            sender_profile_pic: null,
            typeSpeed: 0,
        };

        historyConversationFormatted = [
            newMessageUser,
            ...historyConversationFormatted,
        ];

        const newMessageCharacter: TMessage = {
            messsage_from: "character",
            message_id: `character-${val.id}`,
            message: [val.character_message] as string[],
            sender_profile_pic: null,
            typeSpeed: 0,
        };

        historyConversationFormatted = [
            newMessageCharacter,
            ...historyConversationFormatted,
        ];
    });

    const [messages, setMessages] = useState<TMessage[]>(
        historyConversationFormatted
    );

    const [waitForCharacterChat, setWaitForCharacterChat] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = new WebSocket(
            `${WEBSOCKET_API_BASE_URL}/${userId}/${characterId}`
        );

        newSocket.onerror = (err) => {
            console.error(err);
        };

        newSocket.onopen = () => {
            console.log("connected");
            setSocket(newSocket);
            setIsConnected(true);
        };

        newSocket.onmessage = (event) => {
            const response: TMessageResponse = JSON.parse(event.data);
            const newMessage: TMessage = {
                messsage_from: "character",
                message_id: `character-${response.message_id}`,
                message: [response.character_message],
                sender_profile_pic: response.character_profile_pic,
                typeSpeed: 25,
            };

            setMessages((prev) => [newMessage, ...prev]);
            setWaitForCharacterChat(false);
        };

        newSocket.onclose = () => {
            console.info(`${new Date()} - socket close`);
            setWaitForCharacterChat(false);
        };

        const send = newSocket.send;

        newSocket.send = (message) => {
            const newMessage: TMessage = {
                messsage_from: "user",
                message_id: `user-${Date.now()}`,
                message: [message] as string[],
                sender_profile_pic: "",
                typeSpeed: 0,
            };

            setMessages((prev) => [newMessage, ...prev]);
            send.call(
                newSocket,
                JSON.stringify({
                    text: message,
                })
            );

            setWaitForCharacterChat(true);
        };

        return () => {
            newSocket.close();
            // setMessages([]);
        };
    }, [userId, characterId]);

    return { socket, messages, waitForCharacterChat, isConnected };
};

export default useChat;
