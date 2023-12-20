import Image from "next/image";

interface RecentChatCardProps {
    name: string;
    imageSrc: string;
    message: string;
    time: string;
}

export default function RecentChatCard({
    name,
    imageSrc,
    message,
    time,
}: RecentChatCardProps) {
    return (
        <div className="w-48 flex flex-col p-4 gap-4 border rounded-lg">
            <div className="flex flex-col items-center">
                <Image
                    src={imageSrc}
                    width={100}
                    height={100}
                    alt={`${name} profile picture`}
                    className="rounded-full w-24 aspect-square"
                />
            </div>

            <p className="text-base font-semibold truncate">{name}</p>

            <p className="text-sm line-clamp-3">{message}</p>

            <div className="flex flex-row justify-end">{time}</div>
        </div>
    );
}
