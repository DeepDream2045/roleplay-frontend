import LoraAdaptorCard from "@/components/organism/LoraAdaptorCard/LoraAdaptorCard";
import { TLoraInfo } from "@/types/loraInfoAction";
import React from "react";

type TProfileDisplayLoraAdaptorProps = {
    loraAdaptors: TLoraInfo[];
};

const ProfileDisplayLoraAdaptor = (props: TProfileDisplayLoraAdaptorProps) => {
    return (
        <>
            <h2>Lora Adaptors</h2>
            <p>Lora Adaptors created by you.</p>
            {/* All Character */}
            <div className="flex flex-wrap flex-row gap-4 mt-4">
                {props.loraAdaptors.map((val, index) => {
                    return <LoraAdaptorCard key={`${val.id}`} lora={val} />;
                })}
            </div>
        </>
    );
};

export default ProfileDisplayLoraAdaptor;
