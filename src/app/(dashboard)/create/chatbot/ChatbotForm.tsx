"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { createCharacterAction } from "@/lib/characterInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import ChatbotInputForm from "@/components/atoms/Form/ChatbotInputForm";

type ChatbotFormProps = {
    models: TInputOption[];
    tags: TInputOption[];
};

export default function ChatbotForm({
    models,
    tags,
}: ChatbotFormProps): ReactElement {
    const [state, formAction] = useFormState<any, any>(createCharacterAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <ChatbotInputForm
            models={models}
            tags={tags}
            formAction={formAction}
            state={state}
            chatbotData={{}}
        />
    );
}
