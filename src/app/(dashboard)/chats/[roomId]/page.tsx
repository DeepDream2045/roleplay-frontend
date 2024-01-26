import React from "react";
import Conversation from "./Conversation";
import { getConversationAction, getRoomInfoAction } from "@/lib/chatAction";
import ConversationHeader from "./ConversationHeader";

type TConversationPageProps = {
    params: { roomId: string };
};

async function ConversationPage(props: TConversationPageProps) {
    const roomData = await getRoomInfoAction();
    console.log(roomData);

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

    // const conversationData = await getConversationAction(props.params.roomId);
    // console.log({ conversationData });
    // if (conversationData.hasError) {
    //     return (
    //         <>
    //             <h1>{conversationData.errorMsg[0]}</h1>
    //             {conversationData.errorMsg?.slice(1).map((val: string) => {
    //                 return <p key={val}>{val}</p>;
    //             })}
    //         </>
    //     );
    // }

    const activeRoomData = roomData.rooms.find(
        (item) => item.room_id === props.params.roomId
    );

    console.log({ activeRoomData });
    if (!activeRoomData) {
        return (
            <>
                <h1>Invalid Chat</h1>
                <p>Conversation is not found</p>
            </>
        );
    }

    console.log("hello");

    return <Conversation roomData={activeRoomData} />;
}

export default ConversationPage;
