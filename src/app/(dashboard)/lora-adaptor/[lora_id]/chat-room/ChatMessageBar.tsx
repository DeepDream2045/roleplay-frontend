"use client";

import React, { useEffect, useState } from "react";
import InputText from "@/components/atoms/Input/InputText";
import { SendHorizonal } from "lucide-react";
import { sendMessageToLoraCompletedTrainingAction } from "@/lib/loraInfoAction";
import { useFormState } from "react-dom";
import { TSendMessageToLoraCompletedTrainingActionReturn } from "@/types/loraInfoAction";

type TChatMessageBarProps = {
    waitForLoraAdaptorChat: boolean;
    loraModelId: number;
    onSendMessage: (new_message: string) => void;
    onNewMessage: (response_message: string) => void;
    setWaitForLoraAdaptorChat: (waitForLoraAdaptorChat: boolean) => void;
};

const ChatMessageBar = (props: TChatMessageBarProps) => {
    const [message, setMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const sendMessageToLoraCompletedTrainingActionWithCharId =
        sendMessageToLoraCompletedTrainingAction.bind(null, props.loraModelId);

    const [state, formAction] = useFormState<
        TSendMessageToLoraCompletedTrainingActionReturn,
        any
    >(sendMessageToLoraCompletedTrainingActionWithCharId, undefined);

    const sendMessageHandler = (e: any) => {
        e.preventDefault();

        if (props.waitForLoraAdaptorChat || message.length === 0) {
            console.log("prevent message sent");

            return;
        }

        if (message && message.length > 0) {
            console.log("message sent");

            props.onSendMessage(message);
            e.currentTarget.form?.requestSubmit();
            setErrorMessage("");
            setMessage("");
        }
    };

    useEffect(() => {
        if (state) {
            if ("hasError" in state) {
                console.log({ error1: state.errorMsg });

                // set error message
                if (state?.errorMsg?.error?.user_text) {
                    setErrorMessage(state.errorMsg.error.user_text);
                } else if (state?.errorMsg && Array.isArray(state.errorMsg)) {
                    setErrorMessage(state.errorMsg.join(", "));
                } else {
                    setErrorMessage("Something went wrong, please try again");
                }

                props.setWaitForLoraAdaptorChat(false);
            } else {
                if ("error" in state) {
                    setErrorMessage(state.error);
                    props.setWaitForLoraAdaptorChat(false);
                } else {
                    console.log({ response: state.response_message });

                    // set response message
                    props.onNewMessage(state.response_message);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <div className="flex flex-col w-full h-14 justify-center items-center">
            {props.waitForLoraAdaptorChat && (
                <div>
                    <p className="text-center">Loading...</p>
                </div>
            )}

            {errorMessage.length > 0 && (
                <div>
                    <p className="text-center text-red-500">{errorMessage}</p>
                </div>
            )}
            <form
                action={formAction}
                className="flex flex-row w-full h-10 px-4 items-center"
            >
                <InputText
                    placeholder="Type a message..."
                    id="user_text"
                    name="user_text"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            sendMessageHandler(e);
                        }
                    }}
                />
                <SendHorizonal
                    className="w-6 h-6 ml-4 cursor-pointer"
                    onClick={sendMessageHandler}
                />
            </form>
        </div>
    );
};

export default ChatMessageBar;
