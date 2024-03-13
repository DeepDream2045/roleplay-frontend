"use client";

import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import { timeAgo } from "@/util/dateUtil";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CharacterCardProps {
    id: string;
    chatbotImageSrc: string | null;
    chatbotName: string;
    chatbotDescription: string;
    creatorImageSrc: string | null;
    creatorUsername: string;
    chatbotTotalReviews: number;
    chatbotLastModifiedDate: string;
}

export default function CharacterCard({
    id,
    chatbotImageSrc,
    chatbotName,
    chatbotDescription,
    creatorImageSrc,
    creatorUsername,
    chatbotTotalReviews,
    chatbotLastModifiedDate,
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
            className="p-2.5 rounded-md flex flex-col cursor-pointer relative group bg-white-100 dark:bg-black-500"
            onClick={(e) => {
                e.preventDefault();
                router.push(`/character/${id}`, {});
            }}
        >
            {/* Character Card Show */}
            <div className="flex flex-col">
                <div className="flex flex-col relative aspect-square rounded-sm">
                    <Image
                        src={convertImageSrcUtil(chatbotImageSrc)}
                        alt={`${chatbotName} image`}
                        quality={100}
                        priority
                        unoptimized
                        fill
                        className="object-cover object-center"
                    />
                    <div className="absolute -bottom-5 rounded-full w-10 aspect-square left-1/2 -translate-x-1/2">
                        <Image
                            src={convertImageSrcUtil(creatorImageSrc)}
                            alt={`${creatorUsername} image`}
                            fill
                            className="object-cover object-center rounded-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-2 items-center mt-7">
                    <div className="flex flex-col gap-[0.125rem] items-center">
                        <p className="text-xs line-clamp-1 leading-normal font-bold text-black-500 dark:text-white-0">
                            {chatbotName}
                        </p>

                        <p className="text-[0.5rem] line-clamp-1 leading-normal font-normal text-black-200">
                            @{creatorUsername}
                        </p>
                    </div>
                    <p className="text-[0.625rem] min-h-[1.875rem] line-clamp-2 leading-normal font-normal text-black-500 dark:text-white-0">
                        @{chatbotDescription}
                    </p>

                    <div className="flex flex-row gap-3">
                        <div className="flex flex-1 flex-col items-center">
                            <p className="text-sm leading-normal line-clamp-1 font-bold text-black-500 dark:text-white-0">
                                {chatbotTotalReviews}
                            </p>
                            <p className="text-[0.625rem] line-clamp-1 leading-normal font-normal text-black-100">
                                Comments
                            </p>
                        </div>
                        <div className="flex flex-1 flex-col items-center">
                            <p className="text-sm leading-normal line-clamp-1 font-bold text-black-500 dark:text-white-0">
                                {timeAgo(chatbotLastModifiedDate)[0]}
                            </p>
                            <p className="text-[0.625rem] line-clamp-1 leading-normal font-normal text-black-100">
                                {timeAgo(chatbotLastModifiedDate)[1]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Character Detail Information show on hover */}
            <div
                className={`absolute hidden group-hover:flex flex-col bg-white-0 dark:bg-black-900 shadow-lg rounded-md border border-gray-200 z-50 ${
                    hoverOnLeft ? "right-full" : "left-full"
                } top-4 min-w-[18rem] p-4`}
            >
                <div className="overflow-hidden flex flex-col gap-1">
                    <h3>{chatbotName}</h3>
                    <h4>Creator</h4>
                    <p className="text-xs">{creatorUsername}</p>
                    {chatbotDescription && (
                        <>
                            <h4>Short Description</h4>
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
