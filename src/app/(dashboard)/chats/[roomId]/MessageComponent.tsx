import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

interface MessageComponentProps {
    imageSrc?: string;
    message: string[];
    rigth?: boolean;
    typeSpeed?: number;
}

export default function MessageComponent({
    imageSrc,
    message,
    rigth = false,
    typeSpeed = 0,
}: MessageComponentProps) {
    const wrapperClass = rigth
        ? "flex flex-row-reverse justify-start gap-4 w-full"
        : "flex flex-row gap-4 pr-32 items-end w-full";
    return (
        <div className={wrapperClass}>
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt="character"
                    width={100}
                    height={100}
                    className="w-8 h-8 aspect-square rounded-full"
                />
            )}

            <div
                className={`flex ${
                    rigth
                        ? "bg-white-0 dark:bg-white-700"
                        : "bg-blue-200 dark:bg-blue-700"
                } p-2 rounded-lg`}
            >
                <Typewriter words={message} loop={1} typeSpeed={typeSpeed} />
            </div>
        </div>
    );
}
