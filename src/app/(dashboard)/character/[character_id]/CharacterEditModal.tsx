import ModalWrapper from "@/app/components/ModalWrapper";
import InputFile from "@/components/atoms/Input/InputFile";
import InputRadio from "@/components/atoms/Input/InputRadio";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputText from "@/components/atoms/Input/InputText";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputToggle from "@/components/atoms/Input/InputToggle";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { updateCharacterAction } from "@/lib/characterInfoAction";
import { CharacterInfoType } from "@/types/action";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import Button from "@/components/atoms/Button";
import { CHATBOT_PROMPT_PLACEHOLDER } from "@/constants/constants";
import InputTextAreaWithUploadFile from "@/components/atoms/Input/InputTextAreaWithUploadFile";
import ChatbotInputForm, {
    ChatbotInputFormProps,
} from "@/components/atoms/Form/ChatbotInputForm";

type Props = {
    onClose: () => void;
    models: TInputOption[];
    tags: TInputOption[];
    characterData: CharacterInfoType;
};

const CharacterEditModal = ({
    onClose,
    models,
    tags,
    characterData,
}: Props) => {
    const chatbotData: ChatbotInputFormProps["chatbotData"] = {
        character_name: characterData.character_name,
        character_gender: characterData.character_gender,
        model_id: characterData.model_id,
        short_bio: characterData.short_bio,
        prompt: characterData.prompt,
        character_visibility: characterData.character_visibility,
        tags: characterData.tags,
        initial_message: characterData.initial_message,
        NSFW: characterData.NSFW,
        character_story: characterData.character_story,
    };

    const updateCharacterActionWithCharId = updateCharacterAction.bind(
        null,
        String(characterData.id)
    );

    const [state, formAction] = useFormState<any, any>(
        updateCharacterActionWithCharId,
        {
            hasError: false,
            errorMsg: {},
        }
    );

    // characterData.prompt = characterData.prompt.replace(/\\n/g, "\n");
    // if (characterData.character_story) {
    //     characterData.character_story = characterData.character_story.replace(
    //         /\\n/g,
    //         "\n"
    //     );
    // }

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8 overflow-hidden scrollbar-hide"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-1 overflow-y-hidden scrollbar-hide pt-4 px-8 flex-col bg-white-0 min-w-screen-lg max-w-screen-lg rounded-lg">
                    <header className=" py-4 px-6 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2 className="flex flex-1 justify-center">
                                Update Character
                            </h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="px-2 mt-8 flex flex-1 flex-col pb-12 overflow-y-scroll scrollbar-hide">
                        <ChatbotInputForm
                            chatbotData={chatbotData}
                            formAction={formAction}
                            models={models}
                            state={state}
                            tags={tags}
                        />
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default CharacterEditModal;
