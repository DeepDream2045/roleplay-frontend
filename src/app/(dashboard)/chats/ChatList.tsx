import React from "react";
import ChatComponent from "./ChatComponent";

type TChatListProps = {};

const ChatList = (props: TChatListProps) => {
    return (
        <div className="w-96 border-r min-h-full py-4 sticky top-0">
            <div className="h-16 flex">
                <h1 className="text-3xl font-semibold px-4">Chats</h1>
            </div>
            <div className="flex flex-col gap-2">
                {/* Chat Component */}
                <ChatComponent
                    name="Levi Ackerman"
                    imageSrc="/images/Levi Ackerman Profile Picture.webp"
                    message="I may have a serious exterior, but deep down I just want someone to"
                    time="Friday"
                    active
                />
                <ChatComponent
                    name="Sasuke Uchiha"
                    imageSrc="/images/Sasuke Uchiha Profile Picture.webp"
                    message="Welcome to our support chat! How may I assist you?"
                    time="Tuesday"
                />
            </div>
        </div>
    );
};

export default ChatList;
