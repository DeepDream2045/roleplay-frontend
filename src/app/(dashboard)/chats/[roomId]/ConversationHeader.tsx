import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

type TConversationHeaderProps = {
    characterName: string;
    characterImage: string | undefined | null;
    socket: WebSocket | undefined;
};

const ConversationHeader = (props: TConversationHeaderProps) => {
    console.log({ socket: props.socket, state: props.socket?.readyState });

    return (
        <div className="flex flex-row w-full justify-between px-4 py-4 h-16 border-b">
            <div className="flex flex-row items-center gap-4">
                <Image
                    src={
                        props.characterImage
                            ? `${props.characterImage}`
                            : "/images/default-image-placeholder.webp"
                    }
                    alt="character"
                    width={100}
                    height={100}
                    className="w-12 h-12 aspect-square rounded-full"
                />
                <div className="text-lg font-medium line-clamp-1 cursor-default">
                    {props.characterName}
                </div>
            </div>
            <div>
                <h3>
                    {props.socket?.readyState === props.socket?.OPEN
                        ? ""
                        : props.socket?.readyState === WebSocket.CLOSED
                        ? "Unexpected Error, please refresh the page"
                        : "Connecting to server..."}
                </h3>
            </div>
            <div className="flex flex-row items-center">
                <MoreHorizontal className="w-8 h-8" />
            </div>
        </div>
    );
};

export default ConversationHeader;
