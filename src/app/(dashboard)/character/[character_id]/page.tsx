import Button from "@/components/atoms/Button";
import Rating from "@/components/atoms/Rating/Rating";
import { getAuthSession } from "@/lib/authSession";
import { getRoomInfoAction } from "@/lib/chatAction";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CharacterInfoType } from "@/types/action";

type TCharacterPageProps = {
    params: { character_id: string };
};

const CharacterPage = async ({
    params: { character_id },
}: TCharacterPageProps) => {
    const session = await getAuthSession();

    const character_info: CharacterInfoType = {
        id: 2,
        character_name: "Character Test Role",
        short_bio: "Character Test Role",
        character_gender: "Gender 2",
        tags: [
            { id: 1, tag_name: "Anime" },
            { id: 3, tag_name: "Female" },
        ],
        prompt: "Character test prompt",
        character_visibility: "unlisted",
        initial_message: "Character initial_message",
        image: null,
        NSFW: false,
        lorebook: "",
        language: "",
        created_date: "2024-01-25T03:42:51.904214Z",
        modified_date: "2024-01-25T03:42:51.904238Z",
        model_id: {
            id: 1,
            model_name: "llama2",
            model_location: "model",
            prompt_template: "template",
            repetition_penalty: "",
            short_bio: "",
            temperature: "0.5",
            top_k: 0.5,
            top_p: 0.2,
        },
        user: {
            id: 1,
            profile_image: null,
            full_name: "Ersapta Aristo",
        },
    };
    return (
        <div className="flex flex-col mt-5 flex-1 min-h-full items-center gap-4">
            <div className="flex">
                <Image
                    src={
                        character_info.image ||
                        "/images/default-image-placeholder.webp"
                    }
                    width={300}
                    height={300}
                    alt={character_info.character_name}
                    className="w-72 rounded-2xl aspect-square object-cover"
                    priority
                />
            </div>

            <div className="flex flex-col gap-2 items-center">
                <h3 className="font-semibold">
                    {character_info.character_name}
                </h3>
                <Link
                    href={`/profile/${character_info.id}`}
                    className="text-blue-500"
                    target="_blank"
                >
                    <p className="font-medium">
                        @{character_info.user.full_name}
                    </p>
                </Link>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
                <p>{"5.0"}</p>
                <Rating rating={2.5} />
                <p>(2)</p>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
                {character_info.tags.map((val) => {
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

            <form action={getRoomInfoAction}>
                <Button
                    type="button"
                    variant="fill"
                    color="primary"
                    size="medium"
                    className="min-w-72 sticky bottom-0"
                >
                    Start chat
                </Button>
            </form>
        </div>
    );
};

export default CharacterPage;
