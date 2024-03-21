"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import RoomDeleteModal from "./RoomDeleteModal";
import { TRoomInfo } from "@/lib/chatAction";

interface ChatComponentProps {
    name: string;
    imageSrc: string;
    message: string;
    time: string;
    active?: boolean;
    onClick?: () => void;
    roomData: TRoomInfo;
    isGuest: boolean;
}

export default function ChatComponent({
    name,
    imageSrc,
    message,
    time,
    active = false,
    onClick = () => {},
    roomData,
    isGuest,
}: ChatComponentProps) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    return (
        <div className="flex flex-row h-20 gap-3">
            <div
                className={`flex relative flex-row flex-1 p-4 rounded-md items-center gap-4 cursor-pointer ${
                    active
                        ? "bg-white-500 dark:bg-black-700"
                        : "bg-white-0 dark:bg-black-900"
                }`}
                onClick={onClick}
            >
                <div className="relative w-10 aspect-square rounded-full">
                    <Image
                        src={imageSrc}
                        alt="character"
                        fill
                        className="aspect-square rounded-full object-center object-cover"
                    />
                </div>

                <div className="relative flex flex-1 flex-col">
                    <h3 className="text-base font-semibold line-clamp-1 cursor-pointer">
                        {name}
                    </h3>

                    <div className="flex flex-row gap-4">
                        <p className="text-xs line-clamp-1">{message}</p>

                        <div className="text-xs">{time}</div>
                    </div>
                </div>
            </div>
            <div
                className="flex w-16 h-full flex-col gap-1 bg-red-600 text-white-0 items-center justify-center rounded-md cursor-pointer"
                onClick={() => {
                    setShowDeleteModal(true);
                }}
            >
                <Trash2 className="w-6 h-6 text-white" />
                <p className="text-white-0 font-medium text-sm">Delete</p>
            </div>
            {showDeleteModal && (
                <RoomDeleteModal
                    onClose={() => {
                        setShowDeleteModal(false);
                    }}
                    roomData={roomData}
                    isGuest={isGuest}
                />
            )}
        </div>
    );
}
