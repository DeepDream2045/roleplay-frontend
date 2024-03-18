import CharacterCard from "@/app/components/dashboard/CharacterCard";
import { CharacterInfoType } from "@/types/action";
import React from "react";

type TProfileDisplayChatbotProps = {
    characters: CharacterInfoType[];
};

const ProfileDisplayChatbot = (props: TProfileDisplayChatbotProps) => {
    return (
        <>
            <p className="font-bold text-2xl leading-normal text-black-900">
                Characters created by You
            </p>
            {/* All Character */}
            <div className="flex flex-wrap flex-row mt-5 gap-10">
                {props.characters.map((val) => {
                    return (
                        <CharacterCard
                            key={`char-${val.id}`}
                            id={String(val.id)}
                            chatbotImageSrc={val.image}
                            chatbotName={val.character_name}
                            chatbotDescription={val.short_bio}
                            chatbotTags={val.tags}
                            creatorImageSrc={val.user.profile_image}
                            creatorUsername={val.user.username}
                            chatbotTotalReviews={0}
                            chatbotLastModifiedDate={val.modified_date}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ProfileDisplayChatbot;
