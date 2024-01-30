import React from "react";
import Conversation from "./Conversation";
import { getRoomInfoAction } from "@/lib/chatAction";

type TConversationPageProps = {
    params: { roomId: string };
};

async function ConversationPage(props: TConversationPageProps) {
    const roomData = await getRoomInfoAction();

    if (roomData.hasError) {
        return (
            <>
                <h1>{roomData.errorMsg[0]}</h1>
                {roomData.errorMsg?.slice(1).map((val) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const activeRoomData = roomData.rooms.find(
        (item) => item.room_id === props.params.roomId
    );

    if (!activeRoomData) {
        return (
            <>
                <h1>Invalid Chat</h1>
                <p>Conversation is not found</p>
            </>
        );
    }

    return (
        <div className="flex flex-1 flex-col w-full">
            <Conversation roomData={activeRoomData} />
        </div>
    );
}

export default ConversationPage;
