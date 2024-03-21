"use client";

import React, { useEffect } from "react";
import ChatComponent from "./ChatComponent";
import { useParams, useRouter } from "next/navigation";
import { TRoomInfo } from "@/lib/chatAction";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY } from "@/constants/constants";

type TChatListProps = {
    rooms: TRoomInfo[];
    isGuest: boolean;
};

const ChatList = (props: TChatListProps) => {
    const params = useParams();
    const router = useRouter();

    const activeChatRoomId: string | null = (params?.roomId as string) || null;

    const [rooms, setRooms] = React.useState(props.rooms);

    useEffect(() => {
        if (props.isGuest) {
            const guestRooms = JSON.parse(
                localStorage.getItem(GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY)!
            );

            setRooms(guestRooms);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-96 border-r min-h-full max-h-full py-4 sticky top-0 flex flex-col text-black-900 dark:text-white-200">
            <div className="h-16 flex">
                <h1 className="text-3xl font-semibold px-4">Chats</h1>
            </div>
            <div className="flex flex-1 flex-col pt-4 pb-8 px-3 gap-10 overflow-y-scroll scrollbar-hide">
                {/* Chat Component */}
                {rooms?.map((item) => {
                    return (
                        <ChatComponent
                            key={item.room_id}
                            name={item.group_name}
                            imageSrc={
                                item.character.image
                                    ? `${
                                          item.character.image.includes("http")
                                              ? item.character.image
                                              : `${MAIN_API_BASE_URL}${item.character.image}`
                                      }`
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
                            isGuest={props.isGuest}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
