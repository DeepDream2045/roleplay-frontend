import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

type TConversationHeaderProps = {};

const ConversationHeader = (props: TConversationHeaderProps) => {
    return (
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
    );
};

export default ConversationHeader;