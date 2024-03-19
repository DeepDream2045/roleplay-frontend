"use server";

import Rating from "@/components/atoms/Rating/Rating";
import { getAuthSession } from "@/lib/authSession";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    getCharacterInfoAction,
    getPublicCharacterInfoAction,
} from "@/lib/characterInfoAction";
import CreateChatRoomForm from "./CreateChatRoomForm";
import { CharacterInfoType } from "@/types/action";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import CharacterEditDeleteAction from "./CharacterEditDeleteAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getTagInfoListAction } from "@/lib/tagAction";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import ChatbotBasicInfo from "./ChatbotBasicInfo";
import ChatbotInformationContainer from "./ChatbotInformationContainer";

type TCharacterPageProps = {
    params: { character_id: string };
};

async function CharacterPage({
    params: { character_id },
}: TCharacterPageProps) {
    const session = await getAuthSession();
    let characterShouldAuth: CharacterInfoType[] = [];
    let characterInfo: CharacterInfoType | undefined;
    let formattedModel: TInputOption[] = [];
    let formattedTag: TInputOption[] = [];

    if (session?.access) {
        const characterData = await getCharacterInfoAction();
        if (characterData.hasError) {
            return (
                <>
                    <h1>{characterData.errorMsg[0]}</h1>
                    {characterData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (Array.isArray(characterData.characters)) {
            characterShouldAuth = characterData.characters;
        }

        const modelData = await getModelInfoListAction();

        if (modelData.hasError) {
            return (
                <>
                    <h1>{modelData.errorMsg[0]}</h1>
                    {modelData.errorMsg?.slice(1).map((val) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        const models = modelData.models!;

        formattedModel = models.map((item) => {
            return { label: item.model_name, value: String(item.id) };
        });

        const tagData = await getTagInfoListAction();

        if (tagData.hasError) {
            return (
                <>
                    <h1>{tagData.errorMsg[0]}</h1>
                    {tagData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        const tags = tagData.tags!;

        formattedTag = tags.map((item) => {
            return { label: item.tag_name, value: String(item.id) };
        });
    }

    const characterPublicData = await getPublicCharacterInfoAction();

    if (characterPublicData) {
        if (characterPublicData.hasError) {
            return (
                <>
                    <h1>{characterPublicData.errorMsg[0]}</h1>
                    {characterPublicData.errorMsg
                        ?.slice(1)
                        .map((val: string) => {
                            return <p key={val}>{val}</p>;
                        })}
                </>
            );
        }

        characterInfo = characterPublicData.characters?.find((char) => {
            return String(char.id) === character_id;
        });
    }

    const characterShouldAuthInfo = characterShouldAuth.find((char) => {
        return (
            String(char.id) === character_id &&
            String(char.user.id) === String(session.user?.id)
        );
    });

    if (!characterInfo && !characterShouldAuthInfo) {
        return (
            <>
                <h1>Not Found</h1>
                <p>Character is not found</p>
            </>
        );
    }

    const userCharacter = characterShouldAuthInfo || characterInfo;

    if (!userCharacter) {
        return (
            <>
                <h1>Not Found</h1>
                <p>Character is not found</p>
            </>
        );
    }

    return (
        <div className="relative flex flex-col flex-1 py-8  items-center justify-start overflow-clip">
            <div className="relative flex flex-col min-w-screen-md max-w-screen-md max-h-full pb-8">
                <div className="flex flex-1 flex-col gap-7 overflow-y-scroll scrollbar-hide max-h-full">
                    <ChatbotBasicInfo
                        characterData={userCharacter}
                        chatbotGender={userCharacter.character_gender}
                        chatbotImageSrc={userCharacter.image}
                        chatbotLastModifiedDate={userCharacter.modified_date}
                        chatbotName={userCharacter.character_name}
                        chatbotTags={userCharacter.tags}
                        creatorImageSrc={userCharacter.user.profile_image}
                        creatorUsername={userCharacter.user.username}
                        id={userCharacter.id}
                        models={formattedModel}
                        tags={formattedTag}
                    />

                    <ChatbotInformationContainer>
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-semibold text-2xl leading-normal text-black-900">
                                Description
                            </p>
                            <p className="font-normal text-sm leading-normal text-black-300 text-wrap whitespace-pre-line">
                                {userCharacter.short_bio}
                            </p>
                        </div>
                    </ChatbotInformationContainer>

                    <ChatbotInformationContainer>
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-semibold text-2xl leading-normal text-black-900">
                                Character Story
                            </p>
                            <p className="font-normal text-sm leading-normal text-black-300 text-wrap whitespace-pre-line">
                                {userCharacter.character_story ||
                                    "No Character Story Provided on this Character"}
                            </p>
                        </div>
                    </ChatbotInformationContainer>

                    <ChatbotInformationContainer>
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-semibold text-2xl leading-normal text-black-900">
                                Initial Message
                            </p>
                            <p className="font-normal text-sm leading-normal text-black-300 text-wrap whitespace-pre-line">
                                {userCharacter.initial_message}
                            </p>
                        </div>
                    </ChatbotInformationContainer>

                    <ChatbotInformationContainer>
                        <div className="flex flex-1 flex-col gap-2">
                            <p className="font-semibold text-2xl leading-normal text-black-900">
                                Character Prompt
                            </p>
                            <p className="font-normal text-sm leading-normal text-black-300 text-wrap whitespace-pre-line">
                                {userCharacter.prompt}
                            </p>
                        </div>
                    </ChatbotInformationContainer>
                </div>
            </div>

            <CreateChatRoomForm
                character_id={character_id}
                initialMessage={userCharacter?.initial_message}
            />
        </div>
    );
}

export default CharacterPage;
