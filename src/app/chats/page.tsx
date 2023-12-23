"use client";

import { ReactElement, useState } from "react";
import ChatsLayout from "@/app/chats/layout";
import Image from "next/image";
import InputForm from "../components/InputForm";
import Toggle from "../components/Toggle";
import ChatComponent from "./ChatComponent";
import { MoreHorizontal, SendHorizonal } from "lucide-react";
import MessageComponent from "./MessageComponent";

interface ChatsProps {
    children: ReactElement;
}

function Chats(props: ChatsProps): ReactElement {
    const [isShowPrompt, setIsShowPrompt] = useState<boolean>(true);

    return (
        <div className="flex flex-1 flex-row w-full">
            {/* Chat List */}
            <div className="w-96 border-r min-h-full py-4 sticky top-0">
                <div className="h-16 flex">
                    <h2 className="text-3xl font-semibold px-4">Chats</h2>
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
            {/* Message List Container */}
            <div className="flex flex-1 flex-col">
                {/* Message Header */}
                <div className="flex flex-row justify-between px-4 py-4 h-16 border-b">
                    <div className="flex flex-row items-center gap-4">
                        <Image
                            src="/images/Levi Ackerman Profile Picture.webp"
                            alt="character"
                            width={100}
                            height={100}
                            className="w-12 h-12 aspect-square rounded-full"
                        />
                        <div className="text-lg font-medium line-clamp-1">
                            Levi Ackerman
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <MoreHorizontal className="w-8 h-8" />
                    </div>
                </div>
                {/* Message List */}
                <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4">
                    <MessageComponent
                        message="I may have a serious exterior, but deep down I just want someone to share my cape with while slaying Titans."
                        rigth
                    />
                    <MessageComponent
                        imageSrc="/images/Levi Ackerman Profile Picture.webp"
                        message="I may have a serious exterior, but deep down I just want someone to share my cape with while slaying Titans."
                    />
                </div>
                {/* Input Message */}
                <div className="flex flex-row w-full py-2 px-4 items-center">
                    <InputForm
                        placeholder="Type a message..."
                        type="text"
                        id="message"
                    />
                    <SendHorizonal className="w-6 h-6 ml-4" />
                </div>
            </div>
        </div>
    );
}

Chats.getLayout = (page: ReactElement) => {
    return <ChatsLayout>{page}</ChatsLayout>;
};

export default Chats;
