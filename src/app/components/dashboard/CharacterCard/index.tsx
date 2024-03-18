"use client";

import { Tag } from "@/types/action";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import { timeAgo } from "@/util/dateUtil";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatbotImage from "./ChatbotImage";
import ChatbotTagContainer from "./ChatbotTagContainer";
import ChatbotDetailContainer from "./ChatbotDetailContainer";

export type CharacterCardProps = {
    id: string;
    chatbotImageSrc: string | null;
    chatbotName: string;
    chatbotDescription: string;
    chatbotTotalReviews: number;
    chatbotLastModifiedDate: string;
    chatbotTags: Tag[];
    creatorImageSrc: string | null;
    creatorUsername: string;
};

export default function CharacterCard({
    id,
    chatbotImageSrc,
    chatbotName,
    chatbotDescription,
    chatbotTotalReviews,
    chatbotLastModifiedDate,
    chatbotTags,
    creatorImageSrc,
    creatorUsername,
}: CharacterCardProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverOnLeft, setHoverOnLeft] = useState(false);
    useEffect(() => {
        function updatePosition() {
            if (!containerRef.current) return;

            const cardRect = containerRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            const sidebar = document.getElementById("sidebar");

            const sidebarRect = sidebar!.getBoundingClientRect();

            const isHoverOnLeft =
                cardRect.right + cardRect.width >= windowWidth &&
                cardRect.left >= sidebarRect.width + cardRect.width * 0.5;
            if (isHoverOnLeft) {
                setHoverOnLeft(true);
            }
        }

        updatePosition(); // Call initially on render
        window.addEventListener("resize", updatePosition);

        // Cleanup function for the event listener
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    return (
        <div
            ref={containerRef}
            className="p-6 w-82 max-w-82 h-95 max-h-95 rounded-2xl flex flex-col cursor-pointer relative group bg-white-0 dark:bg-black-500"
            onClick={(e) => {
                e.preventDefault();
                router.push(`/character/${id}`, {});
            }}
        >
            {/* Character Card Show */}
            <div className="flex flex-col gap-4 flex-1 max-h-full">
                <ChatbotImage
                    chatbotImageSrc={chatbotImageSrc}
                    chatbotName={chatbotName}
                />
                {/* Character Card Tag */}
                <ChatbotTagContainer chatbotTags={chatbotTags} />
                <ChatbotDetailContainer
                    chatbotDescription={chatbotDescription}
                    chatbotLastModifiedDate={chatbotLastModifiedDate}
                    chatbotTotalReviews={chatbotTotalReviews}
                    chatbotName={chatbotName}
                    creatorImageSrc={creatorImageSrc}
                    creatorUsername={creatorUsername}
                />
            </div>

            {/* Character Detail Information show on hover */}
            <div
                className={`absolute hidden group-hover:flex flex-col bg-white-0 dark:bg-black-900 shadow-lg rounded-md border border-gray-200 z-50 ${
                    hoverOnLeft ? "right-full" : "left-full"
                } top-4 min-w-[18rem] p-4`}
            >
                <div className="overflow-hidden flex flex-col gap-1">
                    <h3 className="font-bold text-sm leading-normal text-black-900 line-clamp-1">
                        {chatbotName}
                    </h3>
                    <h4 className="font-semibold text-sm leading-normal text-black-900 line-clamp-1">
                        Creator
                    </h4>
                    <p className="text-xs">{creatorUsername}</p>
                    {chatbotDescription && (
                        <>
                            <h4 className="font-semibold text-sm leading-normal text-black-900 line-clamp-1">
                                Short Description
                            </h4>
                            <p className="text-xs line-clamp-5">
                                {chatbotDescription}
                            </p>
                        </>
                    )}
                    <hr className="border-1 my-3" />
                    <p className="text-xs">
                        {timeAgo(chatbotLastModifiedDate).join(" ")}
                    </p>
                </div>
            </div>
        </div>
    );
}
