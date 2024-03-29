"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface RecentChatCardProps {
    roomId: string;
    name: string;
    imageSrc: string;
    message: string;
    time: string;
}

export default function RecentChatCard({
    roomId,
    name,
    imageSrc,
    message,
    time,
}: RecentChatCardProps) {
    const router = useRouter();

    return (
        <div
            className="w-48 flex flex-col p-4 gap-4 border rounded-lg cursor-pointer"
            onClick={() => {
                router.push(`/chats/${roomId}`, {});
            }}
        >
            <div className="flex flex-col items-center">
                <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt={`${name} profile picture`}
                    className="rounded-full w-24 aspect-square object-cover object-center"
                />
            </div>

            <p className="text-base font-semibold truncate">{name}</p>

            <p className="text-sm line-clamp-3">{message}</p>

            <div className="flex flex-row justify-end">{time}</div>
        </div>
    );
}
