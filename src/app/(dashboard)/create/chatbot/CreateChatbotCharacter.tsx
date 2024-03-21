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
            <header className="sticky top-0 flex flex-col flex-1 w-full text-black-900 dark:text-white-200 bg-white-100 dark:bg-black-500 items-center z-10">
                <div className="w-full flex flex-row gap-2">
                    <h4 className={`text-5 leading-normal font-bold`}>
                        New Chatbot
                    </h4>
                    <h5 className="text-5 leading-normal font-normal">
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
