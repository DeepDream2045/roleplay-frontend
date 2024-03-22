"use client";

import React, { FormHTMLAttributes, useState } from "react";
import FormContainer from "./FormContainer";
import InputFile from "../Input/InputFile";
import InputText from "../Input/InputText";
import InputSelect from "../Input/InputSelect";
import { TInputOption } from "../Input/InputType";
import InputTextArea from "../Input/InputTextArea";
import { CharacterInfoType } from "@/types/action";
import {
    CHATBOT_AVAILABILITY_OPTIONS,
    CHATBOT_PROMPT_PLACEHOLDER,
} from "@/constants/constants";
import InputRadio from "../Input/InputRadio";
import InputToggle from "../Input/InputToggle";
import InputTextAreaWithUploadFile from "../Input/InputTextAreaWithUploadFile";
import Button from "../Button";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";

export type ChatbotInputFormProps = {
    formAction: FormHTMLAttributes<HTMLFormElement>["action"];
    state: any;
    models: TInputOption[];
    tags: TInputOption[];
    chatbotData: {
        image?: string | null;
        character_name?: string;
        character_gender?: string;
        model_id?: CharacterInfoType["model_id"];
        short_bio?: string;
        prompt?: string;
        character_visibility?: string;
        tags?: CharacterInfoType["tags"];
        initial_message?: string | null;
        character_story?: string | null;
        NSFW?: boolean;
    };
};

const ChatbotInputForm = (props: ChatbotInputFormProps) => {
    const [isNSFW, setIsNSFW] = useState<boolean>(
        props.chatbotData.NSFW ? props.chatbotData.NSFW : false
    );
    const [visibility, setVisibility] = useState(
        props.chatbotData.character_visibility
            ? (props.chatbotData.character_visibility as string)
            : "unlisted"
    );
    const [modelVal, setModelVal] = useState<TInputOption[]>(
        props.chatbotData.model_id
            ? [
                  {
                      label: props.chatbotData.model_id.model_name,
                      value: String(props.chatbotData.model_id.id),
                  },
              ]
            : []
    );
    const [tagsVal, setTagsVal] = useState<TInputOption[]>(
        props.chatbotData.tags
            ? props.chatbotData.tags.map((val) => {
                  return {
                      label: val.tag_name,
                      value: String(val.id),
                  };
              })
            : []
    );

    return (
        <form
            action={props.formAction}
            className="flex flex-1 flex-col gap-10 py-5"
        >
            <FormContainer>
                <p className="text-5 font-bold leading-normal">Basic Info</p>
                <p className="text-sm font-normal leading-normal">
                    Visualize your chatbot description
                </p>
            </FormContainer>

            <div className="flex flex-row gap-10">
                <FormContainer>
                    <InputFile
                        name="image"
                        id="image"
                        label="Add"
                        helperText="Recommend Size: 512px x 512px"
                        value={props.chatbotData.image || undefined}
                    />
                </FormContainer>
                <FormContainer fullWidth>
                    <div className="flex flex-1 flex-col gap-7 p-4 rounded-lg ">
                        <InputText
                            name="character_name"
                            id="character_name"
                            label="Name"
                            placeholder="Bulma"
                            required
                            defaultValue={props.chatbotData.character_name}
                            errorMsg={props.state.errorMsg.character_name}
                        />

                        <InputText
                            id="character_gender"
                            name="character_gender"
                            label="Gender"
                            placeholder="Gender of the character: male, female, N/A, etc."
                            required
                            defaultValue={props.chatbotData.character_gender}
                            errorMsg={props.state.errorMsg.character_gender}
                        />
                        <InputSelect
                            key="model_id"
                            id="model_id"
                            label="Model Name"
                            placeholder="Select Model"
                            name="model_id"
                            options={props.models}
                            required
                            errorMsg={props.state.errorMsg.model_id}
                            value={modelVal}
                            onChange={(val) => {
                                setModelVal(val);
                            }}
                        />
                    </div>
                </FormContainer>
            </div>

            <FormContainer>
                <InputTextArea
                    id="short_bio"
                    name="short_bio"
                    label="Short description"
                    helperText="Describe the character. This will be displayed on the character page, but not used by the AI."
                    placeholder="Enter a short description of your character..."
                    required
                    errorMsg={props.state.errorMsg.short_bio}
                    defaultValue={props.chatbotData.short_bio}
                />
            </FormContainer>

            <FormContainer>
                <InputTextArea
                    id="prompt"
                    name="prompt"
                    label="Character prompt"
                    helperText="Provide the exact character description as you want it to be used by the AI to generate responses and messsages."
                    placeholder={CHATBOT_PROMPT_PLACEHOLDER}
                    required
                    errorMsg={props.state.errorMsg.prompt}
                    defaultValue={props.chatbotData.prompt}
                />
            </FormContainer>
            <FormContainer>
                <InputRadio
                    id="character_visibility"
                    name="character_visibility"
                    label="Visibility"
                    helperText="You can also change the visibility after the character is created."
                    required
                    value={visibility}
                    onChange={(val: string) => {
                        setVisibility(val);
                    }}
                    options={CHATBOT_AVAILABILITY_OPTIONS}
                    errorMsg={props.state.errorMsg.prompt_visibility}
                />
            </FormContainer>
            <FormContainer>
                <InputSelect
                    key="tags"
                    name="tags"
                    id="tags"
                    label="Tags"
                    placeholder="Search Tags"
                    helperText={`Select up to 5 relevant tags or keywords.`}
                    options={props.tags}
                    multiple
                    required
                    errorMsg={props.state.errorMsg.tags}
                    value={tagsVal}
                    onChange={(val) => {
                        setTagsVal(val);
                    }}
                />
            </FormContainer>

            <FormContainer>
                <p className="text-5 font-bold leading-normal">
                    Advanced info (optional)
                </p>
                <p className="text-sm font-normal leading-normal">
                    Additional information of your chatbot to make it more real.
                </p>
            </FormContainer>

            <FormContainer>
                <InputTextArea
                    id="initial_message"
                    name="initial_message"
                    label="Initial message"
                    helperText="This is the first message that the character will say for the conversation. If this is empty, we will use the name and the description to generate the initial message when creating the character."
                    placeholder="Enter a short description of your character..."
                    defaultValue={props.chatbotData.initial_message}
                />
            </FormContainer>

            <FormContainer>
                <InputToggle
                    value={isNSFW}
                    onChange={(e) => {
                        setIsNSFW((prev) => !prev);
                    }}
                    key={"NSFW"}
                    id="NSFW"
                    name="NSFW"
                    label="Nsfw (Not safe for work)"
                    helperText="If this character is not safe for work, turn this on."
                />
            </FormContainer>

            <FormContainer>
                <InputTextAreaWithUploadFile
                    id="character_story"
                    label="Character Story"
                    name="character_story"
                    rows={8}
                    errorMsg={props.state.errorMsg.character_story}
                    defaultValue={props.chatbotData.character_story}
                />
            </FormContainer>

            {props.state.hasError && (
                <p className="text-red-500 mt-4">Please check the input</p>
            )}
            <div className="mt-8">
                <Button
                    type="submit"
                    color="primary"
                    size="fullWidth"
                    variant="fill"
                    className="min-h-12 max-h-12 flex flex-row justify-center items-center"
                >
                    Create Character
                </Button>
            </div>
        </form>
    );
};

export default ChatbotInputForm;
