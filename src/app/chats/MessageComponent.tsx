import Image from "next/image";

interface MessageComponentProps {
    imageSrc?: string;
    message: string;
    rigth?: boolean;
}

export default function MessageComponent({
    imageSrc,
    message,
    rigth = false,
}: MessageComponentProps) {
    const wrapperClass = rigth
        ? "flex flex-row-reverse justify-end gap-4 pl-32 items-end"
        : "flex flex-row gap-4 pr-32 items-end";
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

            <div className="flex bg-blue-50 p-2 rounded-lg">{message}</div>
        </div>
    );
}
