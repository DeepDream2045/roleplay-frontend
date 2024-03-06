"use client";

import { TLoraInfo } from "@/types/loraInfoAction";
import { timeAgo } from "@/util/dateUtil";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    lora: TLoraInfo;
};

const LoraAdaptorCard = ({ lora }: Props) => {
    const route = useRouter();
    return (
        <div
            key={`lora-card-${lora.id}`}
            onClick={(e) => {
                e.preventDefault();
                route.push(`/lora-adaptor/${lora.id}`);
            }}
            className="w-80 max-w-80 min-w-80 rounded-lg flex flex-col cursor-pointer relative group border border-gray-300 "
        >
            <div className="flex w-full flex-row items-center px-8 py-4 border-b bg-[#444444] text-[#D8D8D8] rounded-tl-lg rounded-tr-lg">
                <div className="flex flex-1 max-w-40 flex-col gap-1">
                    <h6 className="text-xl leading-7 max-w-40 line-clamp-1 font-bold text-[#D8D8D8]">
                        {lora.lora_model_name.length > 14
                            ? `${lora.lora_model_name.substring(0, 11)}...`
                            : lora.lora_model_name}
                    </h6>
                    <p className="text-sm max-w-40 leading-5 line-clamp-1 font-normal">
                        @{lora.user.username}
                    </p>
                </div>
                <div className="flex flex-col justify-end h-full w-[6rem] min-w-[6rem] max-w-[6rem]">
                    <div className="flex flex-row gap-1">
                        <div className="w-5 aspect-square bg-[#9EFABD] rounded-full " />
                        <p className="text-sm leading-5 line-clamp-1 font-normal">
                            {lora.current_status.length > 0
                                ? lora.current_status[0].current_status
                                : "Untrained"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col font-normal justify-start cursor-pointer min-h-48 max-h-48 p-8 ">
                <h4 className="flex text-xl leading-7 line-clamp-1 font-bold cursor-pointer text-[#444444]">
                    Description
                </h4>
                <p className="text-sm leading-5 line-clamp-5 font-normal cursor-pointer overflow-clip text-[#444444]">
                    {lora.lora_short_bio}
                </p>
            </div>
        </div>
    );
};

export default LoraAdaptorCard;
