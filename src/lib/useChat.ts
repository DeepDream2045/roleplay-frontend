"use client";

import { useEffect, useState } from "react";
import { TConversation, TRoomInfo } from "./chatAction";
import { GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY } from "@/constants/constants";

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

const useChat = () => {
    const [socket, setSocket] = useState<WebSocket>();
    const [userId, setUserId] = useState<number | string>();
    const [roomId, setRoomId] = useState<number | string>();
    const [isGuest, setIsGuest] = useState<boolean>();

    const [messages, setMessages] = useState<TMessage[]>([]);

    const [waitForCharacterChat, setWaitForCharacterChat] = useState(false);

    const [connectionState, setConnectionState] = useState<
        "Connecting" | "Connected" | "Error"
    >("Connecting");

    useEffect(() => {
        if (!userId || !roomId) return;

        const newSocket = new WebSocket(
            `${WEBSOCKET_API_BASE_URL}/${userId}/${roomId}`
        );

        setConnectionState("Connecting");

        newSocket.onerror = (err) => {
            console.error(err);
            setConnectionState("Error");
        };

        newSocket.onopen = () => {
            console.log("connected");
            setSocket(newSocket);
            setConnectionState("Connected");
        };

        newSocket.onmessage = (event) => {
            const response: TMessageResponse = JSON.parse(event.data);
            const newMessage: TMessage = {
                messsage_from: "character",
                message_id: `character-${response.message_id}`,
                message: [response.character_message],
                sender_profile_pic: response.character_profile_pic,
                typeSpeed: 4,
            };

            setMessages((prev) => [newMessage, ...prev]);
            setWaitForCharacterChat(false);

            if (isGuest) {
                // Get all room chat from local storage
                const roomChats: TRoomInfo[] = JSON.parse(
                    localStorage.getItem(
                        GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY
                    )!
                );

                // Find the room chat in local storage
                const activeRoomChat = roomChats.find(
                    (room) => room.room_id === roomId
                );

                if (!activeRoomChat) return;
                // Push new message to room chat's chatroom
                const newChatRoom: TConversation = {
                    character_message: response.character_message,
                    chat: 6,
                    created_date: new Date().toISOString(),
                    is_edited: false,
                    modified_date: new Date().toISOString(),
                    user_message: response.sender_user_message,
                    id: parseInt(response.message_id),
                };
                activeRoomChat.chatroom.push(newChatRoom);

                // Update the room chat in local storage

                localStorage.setItem(
                    GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
                    JSON.stringify(roomChats)
                );
            }
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
            setSocket(undefined);
            setConnectionState("Connecting");
            // setMessages([]);
        };
    }, [userId, roomId]);

    const setData = (roomInfo: {
        userId: string | number;
        roomId: string | number;
        historyConversation: TConversation[];
        isGuest: boolean;
    }) => {
        setUserId(roomInfo.userId);
        setRoomId(roomInfo.roomId);
        setIsGuest(roomInfo.isGuest);

        let historyConversationFormatted: TMessage[] = [];

        roomInfo.historyConversation.forEach((val) => {
            if (val.user_message?.length > 0) {
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
            }

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

        setMessages(historyConversationFormatted);
    };

    return { socket, messages, waitForCharacterChat, connectionState, setData };
};

export default useChat;
