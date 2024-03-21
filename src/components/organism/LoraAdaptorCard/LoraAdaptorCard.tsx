import { TLoraInfo } from "@/types/loraInfoAction";
import React from "react";
import LoraExtraInfo from "./LoraExtraInfo";
import LoraDetailInfo from "./LoraDetailInfo";
import LoraFooter from "./LoraFooter";
import Link from "next/link";

type Props = {
    lora: TLoraInfo;
};

const LoraAdaptorCard = ({ lora }: Props) => {
    return (
        <Link
            href={`/lora-adaptor/${lora.id}`}
            key={`lora-card-${lora.id}`}
            className="max-w-120 min-w-120 min-h-72 max-h-72 gap-4 rounded-[1rem] p-6 bg-white-0 dark:bg-black-900 flex flex-col cursor-pointer relative group "
        >
            <LoraExtraInfo
                loraAdaptorTrainStatus={lora.current_status}
                loraAdaptorLastModifiedDate={lora.modified_date}
            />
            <LoraDetailInfo
                loraDescription={lora.lora_short_bio}
                loraName={lora.lora_model_name}
            />
            <LoraFooter
                creatorImageSrc={lora.user.profile_image}
                creatorUsername={lora.user.username}
            />
        </Link>
    );
};

export default LoraAdaptorCard;
