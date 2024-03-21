import LoraAdaptorCard from "@/components/organism/LoraAdaptorCard/LoraAdaptorCard";
import { TLoraInfo } from "@/types/loraInfoAction";
import React from "react";

export type LoraAdaptorPageViewProps = {
    loraData: TLoraInfo[];
};

const LoraAdaptorPageView = ({ loraData }: LoraAdaptorPageViewProps) => {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-black-900 dark:text-white-200">
                Lora Adapators
            </h1>
            <div className="flex flex-wrap flex-row gap-10">
                {loraData.map((lora: TLoraInfo) => {
                    return <LoraAdaptorCard key={lora.id} lora={lora} />;
                })}
            </div>
        </div>
    );
};

export default LoraAdaptorPageView;
