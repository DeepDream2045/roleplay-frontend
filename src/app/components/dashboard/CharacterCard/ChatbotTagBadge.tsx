import React from "react";
import { Tag } from "@/types/action";

type ChatbotTagBadgeProps = {
    tag: Tag;
};

const ChatbotTagBadge = ({ tag }: ChatbotTagBadgeProps) => {
    return (
        <div className="flex flex-row px-2 py-1 items-center justify-center text-black-900 bg-white-200 text-2 font-bold leading-normal rounded-[4px]">
            {tag.tag_name}
        </div>
    );
};

export default ChatbotTagBadge;
