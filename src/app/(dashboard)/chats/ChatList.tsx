"use client";

import React from "react";
import ChatComponent from "./ChatComponent";
import { useParams, useRouter } from "next/navigation";
import { TRoomInfo } from "@/lib/chatAction";

type TChatListProps = {
    rooms: TRoomInfo[];
};

const ChatList = (props: TChatListProps) => {
    const params = useParams();
    const router = useRouter();
    const activeChatRoomId: string | null = (params?.roomId as string) || null;

    return (
        <div className="w-96 border-r min-h-full max-h-full py-4 sticky top-0 flex flex-col">
            <div className="h-16 flex">
                <h1 className="text-3xl font-semibold px-4">Chats</h1>
            </div>
            <div className="flex flex-1 flex-col pt-4 pb-8 pr-3 gap-4 overflow-y-scroll">
                {/* Chat Component */}
                {props.rooms.map((item) => {
                    return (
                        <ChatComponent
                            key={item.room_id}
                            name={item.group_name}
                            imageSrc={
                                item.character.image
                                    ? `${item.character.image}`
                                    : "/images/default-image-placeholder.webp"
                            }
                            message={
                                item.chatroom.length > 0
                                    ? item.chatroom[0].character_message
                                    : "Let's do the chat"
                            }
                            time=""
                            active={item.room_id === activeChatRoomId}
                            onClick={() => {
                                router.push(`/chats/${item.room_id}`, {});
                            }}
                            roomData={item}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
