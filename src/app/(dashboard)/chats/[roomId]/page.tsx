import React from "react";
import Conversation from "./Conversation";
import { getRoomInfoAction } from "@/lib/chatAction";
import { getAuthSession } from "@/lib/authSession";

type TConversationPageProps = {
    params: { roomId: string };
};

async function ConversationPage(props: TConversationPageProps) {
    const session = await getAuthSession();

    let activeRoomData;
    let isGuest = true;

    if (session?.access) {
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

        activeRoomData = roomData.rooms.find(
            (item) => item.room_id === props.params.roomId
        );

        isGuest = false;

        if (!activeRoomData) {
            return (
                <>
                    <h1>Invalid Chat</h1>
                    <p>Conversation is not found</p>
                </>
            );
        }
    }

    return (
        <div className="flex flex-1 flex-col w-full max-h-full pb-3">
            <Conversation
                roomData={activeRoomData}
                roomId={props.params.roomId}
                isGuest={isGuest}
            />
        </div>
    );
}

export default ConversationPage;
