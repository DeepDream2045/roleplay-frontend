"use client";

import { CharacterInfoType } from "@/types/action";
import { timeAgo } from "@/util/dateUtil";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CharacterCardProps {
    id: string;
    name: string;
    imageSrc: string;
    profileImageSrc: string;
    profileName: string;
    characterInformation: CharacterInfoType;
}

export default function CharacterCard({
    id,
    name,
    imageSrc,
    profileImageSrc,
    profileName,
    characterInformation,
}: CharacterCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-72 p-4 flex flex-col cursor-pointer relative group"
            onClick={(e) => {
                e.preventDefault();
                router.push(`/character/${id}`, {});
            }}
        >
            {/* Character Card Show */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <Image
                        src={imageSrc}
                        width={100}
                        height={100}
                        alt={`${name} profile picture`}
                        className="w-72 aspect-square rounded-lg object-cover object-center"
                    />
                </div>

                <div className="flex flex-row flex-1 gap-4">
                    <div>
                        <Image
                            src={profileImageSrc}
                            width={100}
                            height={100}
                            alt={`${profileName} profile picture`}
                            className="rounded-full w-8 aspect-square object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-base font-semibold truncate">
                            {name || "No Character Name"}
                        </p>

                        <div className="flex flex-col gap-1 font-light">
                            <p className="text-sm">
                                @{profileName || "No Name"}
                            </p>

                            <div>
                                <p className="text-xs">
                                    {timeAgo(
                                        characterInformation.modified_date
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Character Detail Information show on hover */}
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-md border border-gray-200 z-10 left-full top-4 min-w-[18rem] p-4">
                <div className="overflow-hidden flex flex-col gap-1">
                    <h3>{characterInformation.character_name}</h3>
                    <h4>Creator</h4>
                    <p className="text-xs">
                        {characterInformation.user.username}
                    </p>
                    {characterInformation.short_bio && (
                        <>
                            <h4>Short Description</h4>
                            <p className="text-xs line-clamp-5">
                                {characterInformation.short_bio}
                            </p>
                        </>
                    )}
                    {/* {characterInformation.prompt && (
                        <>
                            <h4>Character prompt</h4>
                            <p className="text-xs line-clamp-[10]">
                                {characterInformation.prompt}
                            </p>
                        </>
                    )} */}
                    <hr className="border-1 my-3" />
                    <p className="text-xs">
                        {timeAgo(characterInformation.modified_date)}
                    </p>
                </div>
            </div>
        </div>
    );
}
