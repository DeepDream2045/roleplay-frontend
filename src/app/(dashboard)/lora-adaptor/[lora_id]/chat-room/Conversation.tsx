"use client";

import MessageComponent from "./MessageComponent";
import ChatMessageBar from "./ChatMessageBar";
import ConversationHeader from "./ConversationHeader";
import { useEffect, useState } from "react";
import useLoraAdaptorChat from "@/lib/useLoraAdaptorChat";

type TLoraAdaptorData = {
    id: number;
    lora_model_name: string;
};
export default function Conversation(props: {
    loraAdaptorData: {
        id: number;
        lora_model_name: string;
    };
    loraModelId: number;
}) {
    const [loraAdaptorData, setLoraAdaptorData] = useState<TLoraAdaptorData>(
        props.loraAdaptorData
    );

    const {
        messages,
        waitForLoraAdaptorChat,
        onNewMessage,
        onSendMessage,
        setLoraModelId,
        setWaitForLoraAdaptorChat,
    } = useLoraAdaptorChat();

    useEffect(() => {
        setLoraModelId(props.loraModelId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loraModelId]);

    if (!loraAdaptorData) {
        return;
    }

    return (
        <>
            <ConversationHeader
                loraAdapatorModelName={loraAdaptorData.lora_model_name}
            />
            <div className="flex flex-1 flex-col-reverse pt-4 pb-8 px-4 gap-4 overflow-y-scroll">
                {messages.map((item) => {
                    const image = "/images/default-image-placeholder.webp";
                    return (
                        <MessageComponent
                            key={`user-${item.message_id}`}
                            message={item.message}
                            imageSrc={image}
                            rigth={item.messsage_from === "user"}
                            typeSpeed={item.typeSpeed}
                        />
                    );
                })}
            </div>
            <ChatMessageBar
                waitForLoraAdaptorChat={waitForLoraAdaptorChat}
                loraModelId={props.loraModelId}
                onNewMessage={onNewMessage}
                onSendMessage={onSendMessage}
                setWaitForLoraAdaptorChat={setWaitForLoraAdaptorChat}
            />
        </>
    );
}
