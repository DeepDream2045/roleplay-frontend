import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import Image from "next/image";
import React from "react";
import { CharacterCardProps } from ".";

type Props = Pick<CharacterCardProps, "chatbotName" | "chatbotImageSrc">;

const ChatbotImage = ({ chatbotImageSrc, chatbotName }: Props) => {
    return (
        <div className="flex flex-col relative aspect-[280/188] rounded-xl w-70 max-w-70">
            <Image
                src={convertImageSrcUtil(chatbotImageSrc)}
                alt={`${chatbotName} image`}
                quality={100}
                priority
                unoptimized
                fill
                className="object-cover object-center rounded-xl"
            />
        </div>
    );
};

export default ChatbotImage;
