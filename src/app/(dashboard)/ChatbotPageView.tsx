import { TRoomInfo } from "@/lib/chatAction";
import { CharacterInfoType, Tag } from "@/types/action";
import React from "react";
import Category from "../components/dashboard/Category";
import CharacterCard from "../components/dashboard/CharacterCard";

type ChatbotPageViewProps = {
    characterData: CharacterInfoType[];
    tags: Tag[];
    rooms: TRoomInfo[];
};

const ChatbotPageView = ({ characterData, tags }: ChatbotPageViewProps) => {
    return (
        <>
            <div
                className="sticky top-0 z-10 py-4 flex flex-row overflow-x-scroll gap-4 bg-white-200 dark:bg-black-500 scrollbar-hide"
                style={{
                    maxWidth: "calc(100vw - var(--dynamic-rem) - 5rem)",
                }}
            >
                <Category key={"Featured"} active>
                    Featured
                </Category>
                <Category key={"Recommended"}>Recommended</Category>
                <Category key={"All"}>All</Category>
                <Category key={"Recently Added"}>Recently Added</Category>
                <Category key={"Top"}>Top</Category>
                {tags.map((item) => {
                    return <Category key={item.id}>{item.tag_name}</Category>;
                })}
            </div>
            <div className="flex flex-row flex-wrap flex-1 gap-10">
                {characterData!.map((val, index) => {
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

export default ChatbotPageView;
