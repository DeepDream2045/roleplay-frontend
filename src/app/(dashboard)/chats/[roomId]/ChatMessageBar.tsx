"use client";

import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import InputText from "@/components/atoms/Input/InputText";

type TChatMessageBarProps = {
    socket: WebSocket | undefined;
};

const ChatMessageBar = (props: TChatMessageBarProps) => {
    const [message, setMessage] = useState<string>("");
    const sendMessageHandler = () => {
        if (props.socket?.OPEN) {
            if (message) {
                props.socket.send(message);
                setMessage("");
            }
        }
    };

    return (
        <div className="flex flex-row w-full h-10 px-4 items-center">
            <InputText
                placeholder="Type a message..."
                id="message"
                name="message"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        sendMessageHandler();
                    }
                }}
            />
            <SendHorizonal
                className="w-6 h-6 ml-4"
                onClick={sendMessageHandler}
            />
        </div>
    );
};

export default ChatMessageBar;
