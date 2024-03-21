import React from "react";
import { CharacterCardProps } from ".";
import Image from "next/image";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import { timeAgo } from "@/util/dateUtil";

export type ChatbotDetailContainerProps = Pick<
    CharacterCardProps,
    | "creatorImageSrc"
    | "creatorUsername"
    | "chatbotTotalReviews"
    | "chatbotName"
    | "chatbotDescription"
    | "chatbotLastModifiedDate"
>;

const ChatbotDetailContainer = ({
    creatorImageSrc,
    creatorUsername,
    chatbotDescription,
    chatbotLastModifiedDate,
    chatbotName,
    chatbotTotalReviews,
}: ChatbotDetailContainerProps) => {
    return (
        <div className="flex flex-row gap-2 justify-start items-start flex-1">
            <div className="w-6 h-6 relative rounded-full aspect-square">
                <Image
                    src={convertImageSrcUtil(creatorImageSrc)}
                    alt={`${creatorUsername} image`}
                    fill
                    className="object-cover object-center rounded-full"
                />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-row h-6">
                    <p className="font-bold text-sm leading-normal text-black-900 line-clamp-1">
                        {chatbotName}
                    </p>
                </div>
                <div className="flex flex-1 flex-row flex-grow shrink-0">
                    <p className="text-wrap text-ellipsis text-xs font-medium line-clamp-3 leading-normal text-black-200">
                        {chatbotDescription}
                    </p>
                </div>
                <div className="flex flex-row justify-between h-4">
                    <p className="line-clamp-1 flex flex-1 text-ellipsis text-xs font-medium leading-normal text-black-200">
                        {creatorUsername}
                    </p>
                    <p className="text-xs font-medium leading-normal text-black-200">
                        {timeAgo(chatbotLastModifiedDate).join(" ")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatbotDetailContainer;
