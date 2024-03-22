import React from "react";

type ChatbotInformationContainerProps = {
    children: React.ReactNode;
};

const ChatbotInformationContainer = ({
    children,
}: ChatbotInformationContainerProps) => {
    return (
        <div className="flex flex-1 p-6 flex-col rounded-xl bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 cursor-default">
            {children}
        </div>
    );
};

export default ChatbotInformationContainer;
