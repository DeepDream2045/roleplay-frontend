import React from "react";
import ChatbotInformationContainer from "./ChatbotInformationContainer";
import { CharacterInfoType, Tag } from "@/types/action";
import Image from "next/image";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import ChatbotTagBadge from "@/app/components/dashboard/CharacterCard/ChatbotTagBadge";
import { timeAgo } from "@/util/dateUtil";
import CharacterEditDeleteAction from "./CharacterEditDeleteAction";
import { TInputOption } from "@/components/atoms/Input/InputType";

type ChatbotBasicInfoProps = {
    id: number;
    chatbotImageSrc: string | null;
    chatbotName: string;
    chatbotLastModifiedDate: string;
    chatbotGender: string;
    chatbotTags: Tag[];
    creatorImageSrc: string | null;
    creatorUsername: string;
    characterData: CharacterInfoType;
    models: TInputOption[];
    tags: TInputOption[];
};

const ChatbotBasicInfo = (props: ChatbotBasicInfoProps) => {
    return (
        <ChatbotInformationContainer>
            <div className="flex flex-1 flex-row gap-10">
                <div className="w-48 h-48 relative aspect-square">
                    <Image
                        src={convertImageSrcUtil(props.chatbotImageSrc)}
                        alt={`${props.chatbotName} image`}
                        fill
                        className="object-cover object-center rounded-xl"
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    {/* Chatbot Extra Info */}
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-row gap-2 flex-1 overflow-clip">
                            {props.chatbotTags.map((tag, index) => (
                                <ChatbotTagBadge tag={tag} key={tag.id} />
                            ))}
                        </div>
                        <div className="flex flex-row">
                            <p className="text-xs font-medium leading-normal text-black-200">
                                {timeAgo(props.chatbotLastModifiedDate).join(
                                    " "
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex flex-row items-center justify-start gap-2">
                            <div className="w-8 h-8 relative rounded-full aspect-square">
                                <Image
                                    src={convertImageSrcUtil(
                                        props.creatorImageSrc
                                    )}
                                    alt={`${props.creatorUsername} image`}
                                    fill
                                    className="object-cover object-center rounded-full"
                                />
                            </div>
                            <p className="line-clamp-1 flex flex-1 text-ellipsis text-xs font-medium leading-normal text-black-200">
                                {props.creatorUsername}
                            </p>
                        </div>
                        <p className="text-5 font-semibold leading-[100%] text-black-900">
                            {props.chatbotName}
                        </p>
                        <p className="text-sm font-normal leading-normal text-black-300">
                            {props.chatbotGender}
                        </p>
                    </div>
                    <div className="flex">
                        <CharacterEditDeleteAction
                            characterData={props.characterData}
                            characterId={props.id}
                            models={props.models}
                            tags={props.tags}
                        />
                    </div>
                </div>
            </div>
        </ChatbotInformationContainer>
    );
};

export default ChatbotBasicInfo;
