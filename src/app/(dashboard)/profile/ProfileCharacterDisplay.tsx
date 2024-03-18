import { CharacterInfoType } from "@/types/action";
import { TLoraInfo } from "@/types/loraInfoAction";
import React, { useState } from "react";
import ProfileDisplayChatbot from "./ProfileDisplayChatbot";
import ProfileDisplayLoraAdaptor from "./ProfileDisplayLoraAdaptor";

type TProfileCharacterDisplayProps = {
    characterType: "Chatbot" | "LoraAdaptor";
    characters: CharacterInfoType[];
    loraAdaptors: TLoraInfo[];
};

const ProfileCharacterDisplay = (props: TProfileCharacterDisplayProps) => {
    return (
        <div className="flex flex-col mt-10">
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
