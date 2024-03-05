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
            className="w-72 rounded-lg flex flex-col cursor-pointer relative group border border-gray-300 "
        >
            <div className="flex text-lg font-semibold items-center px-4 py-2 border-b border-blue-300">
                {lora.lora_model_name}
            </div>

            <div className="flex flex-col font-normal justify-start px-4 py-2 border-b border-blue-300">
                <h4>Train Status</h4>
                <p className="text-base mb-4">
                    {lora.current_status.length > 0
                        ? lora.current_status[0].current_status
                        : "Not Trained"}
                </p>
                <h4>Description</h4>
                <p className="line-clamp-2 min-h-[3rem] text-base">
                    {lora.lora_short_bio}
                </p>
            </div>

            <div className="flex flex-col py-2 px-4">
                <div className="flex flex-row items-center gap-3">
                    <h4>Creator</h4>
                    <p className="text-xs">{lora.user.username}</p>
                </div>
                <p className="text-xs">{timeAgo(lora.modified_date)}</p>
            </div>
        </div>
    );
};

export default LoraAdaptorCard;
