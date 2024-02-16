"use client";

import { TInputOption } from "@/components/atoms/Input/InputType";
import DynamicTabComponent from "@/components/organism/DynamicTabComponent/DynamicTabComponent";
import React, { useState } from "react";
import type { TabContent } from "@/components/organism/DynamicTabComponent/DynamicTabComponent";
import CreateChatbotCharacter from "./CreateChatbotCharacter";
import CreateAdaptorCharacter from "./CreateAdaptorCharacter";

type Props = {
    formattedModel: TInputOption[];
    formattedTag: TInputOption[];
};

const PageClient = (props: Props) => {
    const [activeTab, setActiveTab] = useState<string>("Chatbot");
    const [isAnimating, setIsAnimating] = useState(false);

    const TAB_CONTENTS: TabContent[] = [
        {
            label: "Chatbot",
            onClick: (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                label: string
            ) => {
                if (activeTab !== label) {
                    setIsAnimating(true);
                    setTimeout(() => {
                        setActiveTab(label);
                        setIsAnimating(false);
                    }, 150);
                }
            },
        },
        {
            label: "Adaptor",
            onClick: (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                label: string
            ) => {
                if (activeTab !== label) {
                    setIsAnimating(true);
                    setTimeout(() => {
                        setActiveTab(label);
                        setIsAnimating(false);
                    }, 150);
                }
            },
        },
    ];

    return (
        <>
            <div className="flex flex-row justify-center mt-6">
                <div className="flex flex-row max-w-md bg-slate-300 rounded-lg px-2 py-2 ">
                    <DynamicTabComponent
                        contents={TAB_CONTENTS}
                        activeTab={activeTab}
                    />
                </div>
            </div>
            <div
                className={`transition-transform ease-in duration-3000 transform ${
                    isAnimating ? "opacity-0" : "opacity-100"
                }`}
            >
                {activeTab === TAB_CONTENTS[0].label && ( // Chatbot
                    <CreateChatbotCharacter
                        formattedModel={props.formattedModel}
                        formattedTag={props.formattedTag}
                    />
                )}
                {activeTab === TAB_CONTENTS[1].label && ( // Adaptor
                    <CreateAdaptorCharacter
                        formattedModel={props.formattedModel}
                        formattedTag={props.formattedTag}
                    />
                )}
            </div>
        </>
    );
};

export default PageClient;
