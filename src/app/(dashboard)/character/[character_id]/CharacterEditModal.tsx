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
import InputAdditionalInfo from "../../new-character/InputAdditionalInfo";
import { CHATBOT_PROMPT_PLACEHOLDER } from "@/constants/constants";

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
    const [isNSFW, setIsNSFW] = useState<boolean>(characterData.NSFW);
    const [visibility, setVisibility] = useState<string>(
        characterData.character_visibility as string
    );
    const [modelVal, setModelVal] = useState<TInputOption[]>([
        {
            label: characterData.model_id.model_name,
            value: String(characterData.model_id.id),
        },
    ]);
    const [tagsVal, setTagsVal] = useState<TInputOption[]>(
        characterData.tags.map((val) => {
            return {
                label: val.tag_name,
                value: String(val.id),
            };
        })
    );

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

    characterData.prompt = characterData.prompt.replace(/\\n/g, "\n");
    if (characterData.character_story) {
        characterData.character_story = characterData.character_story.replace(
            /\\n/g,
            "\n"
        );
    }

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-1 py-4 px-8 flex-col bg-white min-w-2xl max-w-2xl rounded-lg">
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
                    <div className="px-2 mt-8 flex flex-1 flex-col pb-12">
                        <form action={formAction}>
                            <InputFile
                                name="image"
                                id="image"
                                label="Update Character Image"
                                value={characterData.image || undefined}
                                errorMsg={state.errorMsg.image}
                            />

                            {/* Character Form */}
                            <div className="flex flex-col mt-8 gap-4">
                                <div className="flex flex-1 flex-row justify-between">
                                    <div className="font-semibold text-xl">
                                        Basic Info
                                    </div>
                                    <div className="font-medium text-sm">
                                        {""}
                                    </div>
                                </div>
                                <div className="text-base">
                                    For more information about character
                                    creation, refer to our docs.
                                </div>
                                <InputTextArea
                                    id="short_bio"
                                    name="short_bio"
                                    label="Short description"
                                    helperText="Describe the character. This will be displayed on the character page, but not used by the AI."
                                    placeholder="Enter a short description of your character..."
                                    required
                                    errorMsg={state.errorMsg.short_bio}
                                    defaultValue={characterData.short_bio}
                                />
                                <InputText
                                    name="character_name"
                                    id="character_name"
                                    label="Name"
                                    placeholder="Bulma"
                                    required
                                    defaultValue={characterData.character_name}
                                    errorMsg={state.errorMsg.character_name}
                                />

                                <InputText
                                    id="character_gender"
                                    name="character_gender"
                                    label="Gender"
                                    defaultValue={
                                        characterData.character_gender
                                    }
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
                                    defaultValue={characterData.prompt}
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
                                    defaultValue={characterData.initial_message}
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
                                    defaultValue={characterData.character_story}
                                    errorMsg={state.errorMsg.character_story}
                                />
                            </div>
                            {state.hasError && (
                                <p className="text-red-500 mt-4">
                                    Please check the input
                                </p>
                            )}
                            <div className="mt-8">
                                <Button
                                    variant="fill"
                                    color="primary"
                                    size="fullWidth"
                                    type="submit"
                                >
                                    Update Character
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default CharacterEditModal;
