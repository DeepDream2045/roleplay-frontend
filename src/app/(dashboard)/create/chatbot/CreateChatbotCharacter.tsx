import React from "react";
import { TInputOption } from "@/components/atoms/Input/InputType";
import ChatbotForm from "@/app/(dashboard)/create/chatbot/ChatbotForm";

type Props = {
    formattedModel: TInputOption[];
    formattedTag: TInputOption[];
};

const CreateChatbotCharacter = (props: Props) => {
    return (
        <div className="flex flex-1 flex-col py-10">
            <header className="sticky top-0 flex flex-col flex-1 w-full bg-white-100 items-center z-10">
                <div className="w-full flex flex-row gap-2">
                    <h4
                        className={`text-5 leading-normal font-bold text-black-500`}
                    >
                        New Chatbot
                    </h4>
                    <h5 className="text-5 leading-normal font-normal text-black-500">
                        (Draft)
                    </h5>
                </div>
            </header>
            <main className="flex flex-1 flex-col">
                <ChatbotForm
                    models={props.formattedModel}
                    tags={props.formattedTag}
                />
            </main>
        </div>
    );
};

export default CreateChatbotCharacter;
