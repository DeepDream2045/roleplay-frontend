"use client";

import { ReactElement, useState } from "react";
import { useFormState } from "react-dom";
import { createCharacterAction } from "@/lib/characterInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import InputText from "@/components/atoms/Input/InputText";
import InputTextArea from "@/components/atoms/Input/InputTextArea";
import InputFile from "@/components/atoms/Input/InputFile";
import InputToggle from "@/components/atoms/Input/InputToggle";
import InputSelect from "@/components/atoms/Input/InputSelect";
import InputRadio from "@/components/atoms/Input/InputRadio";
import Button from "@/components/atoms/Button";
import InputAdditionalInfo from "./InputAdditionalInfo";
import { CHATBOT_PROMPT_PLACEHOLDER } from "@/constants/constants";

type NewCharacterFormPropsType = {
    models: TInputOption[];
    tags: TInputOption[];
};

export default function NewCharacterForm({
    models,
    tags,
}: NewCharacterFormPropsType): ReactElement {
    const [isNSFW, setIsNSFW] = useState<boolean>(false);
    const [visibility, setVisibility] = useState("unlisted");
    const [modelVal, setModelVal] = useState<TInputOption[]>([]);
    const [tagsVal, setTagsVal] = useState<TInputOption[]>([]);

    const [state, formAction] = useFormState<any, any>(createCharacterAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <div className="px-2 mt-8 flex flex-1 flex-col max-w-screen-md w-full pb-12">
            {/* Image Form */}
            <form action={formAction}>
                <InputFile
                    name="image"
                    id="image"
                    label="Add Character Image"
                />

                {/* Character Form */}
                <div className="flex flex-col mt-8 gap-4">
                    <div className="flex flex-1 flex-row justify-between">
                        <div className="font-semibold text-xl">Basic Info</div>
                        <div className="font-medium text-sm">{""}</div>
                    </div>
                    <div className="text-base">
                        For more information about character creation, refer to
                        our docs.
                    </div>
                    <InputTextArea
                        id="short_bio"
                        name="short_bio"
                        label="Short description"
                        helperText="Describe the character. This will be displayed on the character page, but not used by the AI."
                        placeholder="Enter a short description of your character..."
                        required
                        errorMsg={state.errorMsg.short_bio}
                    />
                    <InputText
                        name="character_name"
                        id="character_name"
                        label="Name"
                        placeholder="Bulma"
                        required
                        errorMsg={state.errorMsg.character_name}
                    />

                    <InputText
                        id="character_gender"
                        name="character_gender"
                        label="Gender"
                        placeholder="Gender of the character: male, female, N/A, etc."
                        required
                        errorMsg={state.errorMsg.character_gender}
                    />

                    <InputSelect
                        key="model_id"
                        id="model_id"
                        label="Model Name"
                        placeholder="Select Model"
                        name="model_id"
                        options={models}
                        required
                        errorMsg={state.errorMsg.model_id}
                        value={modelVal}
                        onChange={(val) => {
                            setModelVal(val);
                        }}
                    />
                    <InputTextArea
                        id="prompt"
                        name="prompt"
                        label="Character prompt"
                        helperText="Provide the exact character description as you want it to be used by the AI to generate responses and messsages."
                        placeholder={CHATBOT_PROMPT_PLACEHOLDER}
                        required
                        rows={5}
                        errorMsg={state.errorMsg.prompt}
                    />

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
                        options={[
                            {
                                label: "Private: Only you can chat",
                                value: "private",
                            },
                            {
                                label: "Unlisted: Anyone with the link can chat but not searchable",
                                value: "unlisted",
                            },
                            {
                                label: "Public: Anyone can discover and chat",
                                value: "public",
                            },
                        ]}
                        errorMsg={state.errorMsg.prompt_visibility}
                    />

                    <InputSelect
                        key="tags"
                        name="tags"
                        id="tags"
                        label="Tags"
                        placeholder="Search Tags"
                        helperText={`Select up to 5 relevant tags or keywords.`}
                        options={tags}
                        multiple
                        required
                        errorMsg={state.errorMsg.tags}
                        value={tagsVal}
                        onChange={(val) => {
                            setTagsVal(val);
                        }}
                    />

                    <div className="flex flex-1 flex-row justify-between">
                        <div className="font-semibold text-xl">
                            Advanced info (optional)
                        </div>
                    </div>

                    <InputTextArea
                        id="initial_message"
                        name="initial_message"
                        label="Initial message"
                        helperText="This is the first message that the character will say for the conversation. If this is empty, we will use the name and the description to generate the initial message when creating the character."
                        placeholder="Enter a short description of your character..."
                    />

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

                    <InputAdditionalInfo
                        label="Character Story"
                        name="character_story"
                        errorMsg={state.errorMsg.character_story}
                    />
                </div>
                {state.hasError && (
                    <p className="text-red-500 mt-4">Please check the input</p>
                )}
                <div className="mt-8">
                    <Button
                        type="submit"
                        color="primary"
                        size="fullWidth"
                        variant="fill"
                    >
                        Create Character
                    </Button>
                </div>
            </form>
        </div>
    );
}
