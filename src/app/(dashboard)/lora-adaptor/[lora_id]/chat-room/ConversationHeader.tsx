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
                <div className="text-lg font-medium line-clamp-1 cursor-default">
                    {props.loraAdapatorModelName}
                </div>
            </div>
            <div className="flex flex-row items-center">
                <h3 className="text-base font-medium line-clamp-1 cursor-default">
                    {message}
                </h3>
            </div>
            <div className="flex flex-row items-center"></div>
        </div>
    );
};

export default ConversationHeader;
