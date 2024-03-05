"use client";

import DynamicTabComponent, {
    TabContent,
} from "@/components/organism/DynamicTabComponent/DynamicTabComponent";
import { CharacterInfoType } from "@/types/action";
import { TLoraInfo } from "@/types/loraInfoAction";
import React, { useState } from "react";
import ProfileDisplayChatbot from "./ProfileDisplayChatbot";
import ProfileDisplayLoraAdaptor from "./ProfileDisplayLoraAdaptor";
import { useRouter } from "next/navigation";

type TProfileCharacterDisplayProps = {
    characterType: "Chatbot" | "LoraAdaptor";
    characters: CharacterInfoType[];
    loraAdaptors: TLoraInfo[];
};

const ProfileCharacterDisplay = (props: TProfileCharacterDisplayProps) => {
    const [activeTab, setActiveTab] = useState<string>(props.characterType);
    const router = useRouter();

    const TAB_CONTENTS: TabContent[] = [
        {
            label: "Chatbot",
            onClick: (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                label: string
            ) => {
                if (activeTab !== label) {
                    setActiveTab(label);
                    router.push(`/profile?character=${label}`);
                }
            },
        },
        {
            label: "LoraAdaptor",
            onClick: (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                label: string
            ) => {
                if (activeTab !== label) {
                    setActiveTab(label);
                    router.push(`/profile?character=${label}`);
                }
            },
        },
    ];

    return (
        <div className="flex flex-col">
            <div className="flex justify-center mb-8">
                <DynamicTabComponent
                    activeTab={props.characterType}
                    contents={TAB_CONTENTS}
                />
            </div>

            {props.characterType === "Chatbot" && (
                <ProfileDisplayChatbot characters={props.characters} />
            )}

            {props.characterType === "LoraAdaptor" && (
                <ProfileDisplayLoraAdaptor loraAdaptors={props.loraAdaptors} />
            )}
        </div>
    );
};

export default ProfileCharacterDisplay;
