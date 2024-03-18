import React from "react";
import DisplaySwitcherItem from "./DisplaySwitcherItem";

type DisplaySwitcherProps = {
    chatbotHref: string;
    loraHref: string;
    active: "Chatbot" | "LoraAdaptor";
};

const DisplaySwitcher = ({
    chatbotHref,
    loraHref,
    active,
}: DisplaySwitcherProps) => {
    return (
        <div className="flex flex-row gap-2 p-3 bg-white-0 w-fit rounded-md">
            <DisplaySwitcherItem
                key={"Chatbot"}
                href={chatbotHref}
                active={active === "Chatbot"}
                label="Chatbot"
            />
            <DisplaySwitcherItem
                key={"LoraAdaptor"}
                href={loraHref}
                active={active === "LoraAdaptor"}
                label="Lora"
            />
        </div>
    );
};

export default DisplaySwitcher;
