"use client";

import { ReactElement, useState } from "react";
import InputForm from "../components/InputForm";
import Image from "next/image";
import Toggle from "../components/Toggle";

export default function NewCharacterForm(props: any): ReactElement {
    const [isShowPrompt, setIsShowPrompt] = useState<boolean>(true);

    return (
        <div className="px-2 mt-8 flex flex-1 flex-col max-w-screen-md w-full pb-12">
            {/* Image Form */}
            <div className="flex flex-col items-center gap-4">
                <Image
                    src={"/images/default-image-placeholder.webp"}
                    width={300}
                    height={300}
                    alt="Levi Ackerman profile picture"
                    className="w-72 rounded-2xl aspect-square"
                />
                <div className="font-semibold flex flex-col text-blue-500">
                    Add or Generate
                </div>
            </div>

            {/* Character Form */}
            <div className="flex flex-col mt-8 gap-4">
                <div className="flex flex-1 flex-row justify-between">
                    <div className="font-semibold text-xl">Basic Info</div>
                    <div className="font-medium text-sm">Import Character</div>
                </div>
                <div className="text-base">
                    For more information about character creation, refer to our
                    docs.
                </div>
                <InputForm
                    id="short-description"
                    label="Short description"
                    helperText="Describe the character. This will be displayed on the character page, but not used by the AI."
                    type="textarea"
                    placeholder="Enter a short description of your character..."
                    required
                />
                <InputForm
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Bulma"
                    required
                    footerFieldText="Generate using description"
                />
                <InputForm
                    id="gender"
                    label="Gender"
                    placeholder="Gender of the character: male, female, N/A, etc."
                    required
                    type="text"
                />
                <InputForm
                    id="character-prompt"
                    label="Character prompt"
                    helperText="Provide the exact character description as you want it to be used by the AI to generate responses and messsages."
                    placeholder="Name:BulmaBody: Bulma is a 16-year-old girl with green hair  in a braided ponytail with a red ribbon and milky colored skin.
Mind: Bulma is a complex character, balancing tomboyish and girly traits alongside a temperamental nature. She surprises with her friendliness and helpfulness, approaching major decisions rationally, displaying persistence in achieving her goals..."
                    required
                    type="textarea"
                    rows={5}
                    footerFieldText="Generate using description, name, gender"
                />

                <InputForm
                    id="visibility"
                    label="Visibility"
                    helperText="You can also change the visibility after the character is created."
                    type="radio"
                    required
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
                />
                <div>
                    <label>Tags</label>
                    <div>Select up to 5 relevant tags or keywords.</div>
                    <select>
                        <option value="action">Action</option>
                        <option value="animal">Animal</option>
                        <option value="anime">Anime</option>
                        <option value="assistant">Assistant</option>
                        <option value="books">Books</option>
                    </select>
                </div>
                <div className="flex flex-1 flex-row justify-between">
                    <div className="font-semibold text-xl">
                        Advanced info (optional)
                    </div>
                </div>
                <InputForm
                    id="initial-message"
                    label="Initial message"
                    helperText="This is the first message that the character will say for the conversation. If this is empty, we will use the name and the description to generate the initial message when creating the character."
                    type="textarea"
                    placeholder="Enter a short description of your character..."
                />
                <InputForm
                    id="example-dialogues"
                    label="Example dialogues"
                    helperText="Sample messages of the character and / or the user. Start the message with '{{char}}:' or '{{user}}:' to indicate who is speaking."
                    type="textarea"
                    placeholder="{{char}}: Hey {{user}}, ever tried ice skating or are you too busy tripping over flat surfaces?
{{user}}: I haven't had the chance yet. It sounds like a fun activity though. Do you enjoy it?"
                />
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="font-semibold text-sm">
                            Show prompts to users
                        </div>
                        <div className="text-xs text-neutral-400">
                            If you want to keep the character prompt and example
                            dialogues private, turn this off.
                        </div>
                    </div>
                    <Toggle
                        toggled={isShowPrompt}
                        onChange={() => {
                            setIsShowPrompt((prev) => !prev);
                        }}
                    />
                </div>
            </div>
            <div className="mt-8">
                <button className="w-full h-10 rounded-lg bg-blue-500 text-white font-semibold">
                    Create Character
                </button>
            </div>
        </div>
    );
}
