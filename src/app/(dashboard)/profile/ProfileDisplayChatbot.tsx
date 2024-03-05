import CharacterCard from "@/app/components/dashboard/CharacterCard";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { CharacterInfoType } from "@/types/action";
import React from "react";

type TProfileDisplayChatbotProps = {
    characters: CharacterInfoType[];
};

const ProfileDisplayChatbot = (props: TProfileDisplayChatbotProps) => {
    return (
        <>
            <h2>Characters</h2>
            <p>
                Characters created by you. Others can only see public
                characters.
            </p>
            {/* All Character */}
            <div className="flex flex-wrap flex-row">
                {props.characters.map((val, index) => {
                    return (
                        <CharacterCard
                            id={`${val.id}`}
                            key={`${val.id}`}
                            imageSrc={
                                val.image
                                    ? `${MAIN_API_BASE_URL}${val.image}`
                                    : "/images/default-image-placeholder.webp"
                            }
                            profileImageSrc={
                                `${MAIN_API_BASE_URL}${val.user.profile_image}` ||
                                "/images/default-image-placeholder.webp"
                            }
                            name={val.character_name}
                            profileName={val.user.full_name}
                            characterInformation={val}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ProfileDisplayChatbot;
