import React from "react";
import { CharacterCardProps } from ".";
import ChatbotTagBadge from "./ChatbotTagBadge";

export type ChatbotTagContainerProps = Pick<CharacterCardProps, "chatbotTags">;

const ChatbotTagContainer = ({ chatbotTags }: ChatbotTagContainerProps) => {
    return (
        <div className="flex flex-row gap-2 overflow-hidden">
            {chatbotTags.map((tag) => (
                <ChatbotTagBadge key={tag.id} tag={tag} />
            ))}
        </div>
    );
};

export default ChatbotTagContainer;
