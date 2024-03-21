import React from "react";
import { Tag } from "@/types/action";

type ChatbotTagBadgeProps = {
    tag: Tag;
};

const ChatbotTagBadge = ({ tag }: ChatbotTagBadgeProps) => {
    return (
        <div className="flex flex-row px-2 items-center justify-center text-black-900 bg-white-200 text-3 font-bold leading-normal rounded-[4px] shrink-0">
            {tag.tag_name}
        </div>
    );
};

export default ChatbotTagBadge;
