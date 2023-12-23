import Image from "next/image";

interface ChatComponentProps {
    name: string;
    imageSrc: string;
    message: string;
    time: string;
    active?: boolean;
}

export default function ChatComponent({
    name,
    imageSrc,
    message,
    time,
    active = false,
}: ChatComponentProps) {
    return (
        <div
            className={`px-4 h-18 flex flex-row items-center gap-4 ${
                active ? "bg-slate-200" : "bg-gray-200"
            }`}
        >
            <div>
                <Image
                    src={imageSrc}
                    alt="character"
                    width={100}
                    height={100}
                    className="max-w-12 aspect-square rounded-full"
                />
            </div>

            <div>
                <h3 className="text-base font-semibold line-clamp-1">{name}</h3>

                <div className="flex flex-row gap-4">
                    <p className="text-xs line-clamp-1">{message}</p>

                    <div className="text-xs">{time}</div>
                </div>
            </div>
        </div>
    );
}
