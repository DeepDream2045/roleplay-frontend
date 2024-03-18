import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import Image from "next/image";
import React from "react";

type LoraFooterProps = {
    creatorUsername: string;
    creatorImageSrc: string;
};

const LoraFooter = ({ creatorImageSrc, creatorUsername }: LoraFooterProps) => {
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <div className="w-8 h-8 relative rounded-full aspect-square">
                <Image
                    src={convertImageSrcUtil(creatorImageSrc)}
                    alt={`${creatorUsername} image`}
                    fill
                    className="object-cover object-center rounded-full"
                />
            </div>
            <p className="line-clamp-1 flex flex-1 text-ellipsis text-xs font-medium leading-normal text-black-200">
                {creatorUsername}
            </p>
        </div>
    );
};

export default LoraFooter;
