"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CharacterCardProps {
    id: string;
    name: string;
    imageSrc: string;
    profileImageSrc: string;
    profileName: string;
    timeString: string;
}

export default function CharacterCard({
    id,
    name,
    imageSrc,
    profileImageSrc,
    profileName,
    timeString,
}: CharacterCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-72 p-4 flex flex-col gap-4 cursor-pointer"
            onClick={() => {
                router.push(`/character/${id}`, {});
            }}
        >
            <div className="flex flex-col">
                <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt={`${name} profile picture`}
                    className="w-72 aspect-square rounded-lg"
                />
            </div>

            <div className="flex flex-row flex-1 gap-4">
                <div>
                    <Image
                        src={profileImageSrc}
                        width={100}
                        height={100}
                        alt={`${profileName} profile picture`}
                        className="rounded-full w-8 aspect-square"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-base font-semibold truncate">{name}</p>

                    <div className="flex flex-col gap-1 font-light">
                        <p className="text-sm">@{profileName}</p>

                        <div>
                            <p className="text-xs">{timeString}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
