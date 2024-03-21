import React from "react";

type LoraDetailInfoProps = {
    loraName: string;
    loraDescription: string;
};

const LoraDetailInfo = ({ loraName, loraDescription }: LoraDetailInfoProps) => {
    return (
        <div className="flex flex-col gap-4 flex-1">
            <h4 className="text-5 font-semibold leading-normal text-black-900 dark:text-white-200 line-clamp-1">
                {loraName}
            </h4>
            <p className="flex flex-1 text-sm font-normal leading-normal text-black-900 dark:text-white-200 line-clamp-5">
                {loraDescription}
            </p>
        </div>
    );
};

export default LoraDetailInfo;
