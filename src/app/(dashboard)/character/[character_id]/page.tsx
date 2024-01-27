"use server";

import Rating from "@/components/atoms/Rating/Rating";
import { getAuthSession } from "@/lib/authSession";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPublicCharacterInfoAction } from "@/lib/characterInfoAction";
import CreateChatRoomForm from "./CreateChatRoomForm";

type TCharacterPageProps = {
    params: { character_id: string };
};

async function CharacterPage({
    params: { character_id },
}: TCharacterPageProps) {
    const session = await getAuthSession();

    const characterPublicData = await getPublicCharacterInfoAction();

    if (characterPublicData.hasError) {
        return (
            <>
                <h1>{characterPublicData.errorMsg[0]}</h1>
                {characterPublicData.errorMsg?.slice(1).map((val: string) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const characterInfo = characterPublicData.characters?.find((char) => {
        return String(char.id) === character_id;
    });

    if (!characterInfo) {
        return (
            <>
                <h1>Not Found</h1>
                <p>Character is not found</p>
            </>
        );
    }

    return (
        <div className="flex flex-col mt-5 flex-1 min-h-full max-h-full items-center ">
            <div className="flex max-w-md flex-col items-center gap-8">
                <div key="character_image_container" className="flex">
                    <Image
                        src={
                            characterInfo.image ||
                            "/images/default-image-placeholder.webp"
                        }
                        width={300}
                        height={300}
                        alt={characterInfo.character_name}
                        className="w-72 rounded-2xl aspect-square object-cover"
                        priority
                    />
                </div>

                <div
                    key="character_basic_info_container"
                    className="flex flex-col gap-2 items-center"
                >
                    <h3 className="font-semibold">
                        {characterInfo.character_name}
                    </h3>
                    <Link
                        href={`/profile/${characterInfo.id}`}
                        className="text-blue-500"
                        target="_blank"
                    >
                        <p className="font-medium">
                            @{characterInfo.user.full_name}
                        </p>
                    </Link>
                </div>

                <div
                    key="character_additional_info_container"
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p>{"5.0"}</p>
                        <Rating rating={2.5} />
                        <p>(2)</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center">
                        {characterInfo.tags.map((val) => {
                            return (
                                <div
                                    key={val.id}
                                    className="text-gray-400 font-semibold border border-gray-300 px-2 py-1 rounded-full"
                                >
                                    <p className="text-xs">{val.tag_name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    key="character_additional_basic_info_container"
                    className="flex flex-col gap-4"
                >
                    <div
                        key="character_short_description_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Short description</h3>
                        <p>{characterInfo.short_bio}</p>
                    </div>
                    <div
                        key="character_initial_message_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Initial message</h3>
                        <p>{characterInfo.initial_message}</p>
                    </div>
                    <div
                        key="character_character_prompt_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Character prompt</h3>
                        <p>{characterInfo.prompt}</p>
                    </div>
                </div>
                <CreateChatRoomForm character_id={character_id} />
            </div>
        </div>
    );
}

export default CharacterPage;
