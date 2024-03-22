import LoraAdaptorCard from "@/components/organism/LoraAdaptorCard/LoraAdaptorCard";
import { TLoraInfo } from "@/types/loraInfoAction";
import React from "react";

type TProfileDisplayLoraAdaptorProps = {
    loraAdaptors: TLoraInfo[];
};

const ProfileDisplayLoraAdaptor = (props: TProfileDisplayLoraAdaptorProps) => {
    return (
        <>
            <p className="font-bold text-2xl leading-normal text-black-900 dark:text-white-200">
                Lora created
            </p>
            {/* All Character */}
            {props.loraAdaptors.length > 0 && (
                <div className="flex flex-wrap flex-row gap-4 mt-4">
                    {props.loraAdaptors.map((val, index) => {
                        return <LoraAdaptorCard key={`${val.id}`} lora={val} />;
                    })}
                </div>
            )}

            {props.loraAdaptors.length === 0 && (
                <div className="flex flex-1 flex-row mt-5">
                    <p className="text-xs font-medium leading-normal text-black-900 dark:text-white-200">
                        No Lora Created
                    </p>
                </div>
            )}
        </>
    );
};

export default ProfileDisplayLoraAdaptor;
