"use client";

import MessageComponent from "./MessageComponent";
import useChat from "@/lib/useChat";
import ChatMessageBar from "./ChatMessageBar";
import ConversationHeader from "./ConversationHeader";
import { TRoomInfo } from "@/lib/chatAction";
import { useEffect, useState } from "react";
import { GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY } from "@/constants/constants";

export default function Conversation(props: {
    roomData?: TRoomInfo;
    conversations?: any;
    roomId?: string;
    isGuest: boolean;
}) {
    const [roomData, setRoomData] = useState<
        TRoomInfo | undefined | { hasError: boolean }
    >(props.roomData);
    const { socket, messages, waitForCharacterChat, connectionState, setData } =
        useChat();

    useEffect(() => {
        if (!roomData) {
            const rooms: TRoomInfo[] = JSON.parse(
                localStorage.getItem(GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY)!
            );

            const activeRoomData = rooms.find(
                (item) => item.room_id === props.roomId
            );

            if (!activeRoomData) {
                setRoomData({ hasError: true });
                return;
            }

            setRoomData(activeRoomData);
        } else {
            if (!("hasError" in roomData) && !socket) {
                setData({
                    userId: roomData.user.id,
                    roomId: roomData.room_id,
                    historyConversation: roomData.chatroom,
                    isGuest: props.isGuest,
                });
            }
        }
    }, [roomData, setData, props.roomId, socket]);

    if (!roomData) {
        return;
    }

    if ("hasError" in roomData) {
        return (
            <>
                <h1>Invalid Chat</h1>
                <p>Conversation is not found</p>
            </>
        );
    }

    return (
        <>
            <ConversationHeader
                characterName={roomData.group_name}
                characterImage={roomData?.character?.image}
                socket={socket}
                connectionState={connectionState}
            />
            <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4 overflow-y-scroll">
                {messages.map((item) => {
                    const image =
                        item.messsage_from === "user"
                            ? ""
                            : roomData?.character?.image
                            ? `${roomData?.character?.image}`
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
