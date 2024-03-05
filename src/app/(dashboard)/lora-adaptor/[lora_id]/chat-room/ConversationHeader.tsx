"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type TConversationHeaderProps = {
    loraAdapatorModelName: string;
};

const ConversationHeader = (props: TConversationHeaderProps) => {
    const [message, setMessage] = useState(
        "This conversation is not saved, reload will delete all messages"
    );

    return (
        <div className="flex flex-row w-full justify-between px-4 py-4 h-16 border-b">
            <div className="flex flex-row items-center gap-4">
                <Image
                    src={"/images/default-image-placeholder.webp"}
                    alt="lora-adaptor"
                    width={100}
                    height={100}
                    className="w-12 h-12 aspect-square rounded-full"
                />
                <div className="text-lg font-medium line-clamp-1 cursor-default">
                    {props.loraAdapatorModelName}
                </div>
            </div>
            <div>
                <h3>{message}</h3>
            </div>
            <div className="flex flex-row items-center">
                <MoreHorizontal className="w-8 h-8" />
            </div>
        </div>
    );
};

export default ConversationHeader;
