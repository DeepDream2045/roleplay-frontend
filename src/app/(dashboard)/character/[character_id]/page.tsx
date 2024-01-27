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
import { Pencil, Trash2 } from "lucide-react";

type TCharacterPageProps = {
    params: { character_id: string };
};

async function CharacterPage({
    params: { character_id },
}: TCharacterPageProps) {
    const session = await getAuthSession();
    let characterShouldAuth: CharacterInfoType[] = [];
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

        if (characterData.characters) {
            characterShouldAuth = characterData.characters;
        }
    }

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

    console.log({ userCharacter });

    return (
        <div className="flex flex-col mt-5 flex-1 min-h-full max-h-full items-center ">
            <div className="flex max-w-md flex-col items-center gap-8">
                <div key="character_image_container" className="flex">
                    <Image
                        src={
                            `${MAIN_API_BASE_URL}${userCharacter?.image}` ||
                            "/images/default-image-placeholder.webp"
                        }
                        width={300}
                        height={300}
                        alt={
                            userCharacter?.character_name ||
                            "user-character-image"
                        }
                        className="w-72 rounded-2xl aspect-square object-cover"
                        priority
                    />
                </div>

                <div
                    key="character_basic_info_container"
                    className="flex flex-col gap-2 items-center"
                >
                    <h3 className="font-semibold">
                        {userCharacter?.character_name}
                    </h3>
                    <Link
                        href={`/profile/${userCharacter?.id}`}
                        className="text-blue-500"
                        target="_blank"
                    >
                        <p className="font-medium">
                            @{userCharacter?.user.full_name}
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
                        {userCharacter?.tags?.map((val) => {
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

                    <div className="flex flex-row gap-2 items-center justify-between">
                        <div className="flex flex-col gap-2 justify-center items-center cursor-pointer">
                            <Pencil className="w-6 h-6" />
                            <p>Edit</p>
                        </div>
                        <div className="flex flex-col gap-2 justify-center items-center cursor-pointer">
                            <Trash2 className="w-6 h-6" />
                            <p>Delete</p>
                        </div>
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
                        <p>{userCharacter?.short_bio || ""}</p>
                    </div>
                    <div
                        key="character_initial_message_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Initial message</h3>
                        <p>{userCharacter?.initial_message || ""}</p>
                    </div>
                    <div
                        key="character_character_prompt_container"
                        className="flex flex-col gap-2"
                    >
                        <h3>Character prompt</h3>
                        <p>{userCharacter?.prompt || ""}</p>
                    </div>
                </div>
                <CreateChatRoomForm character_id={character_id} />
            </div>
        </div>
    );
}

export default CharacterPage;
