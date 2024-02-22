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
        <div className="flex flex-row h-20 gap-2">
            <div
                className={`flex flex-row flex-1 px-4 py-2 rounded-md items-center gap-4 cursor-pointer ${
                    active ? "bg-slate-200" : "bg-gray-200"
                }`}
                onClick={onClick}
            >
                <div>
                    <Image
                        src={imageSrc}
                        alt="character"
                        width={100}
                        height={100}
                        className="max-w-12 aspect-square rounded-full"
                    />
                </div>

                <div>
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
                className="flex w-16 h-full flex-col gap-1 bg-red-600 items-center justify-center rounded-md cursor-pointer"
                onClick={() => {
                    setShowDeleteModal(true);
                }}
            >
                <Trash2 className="w-6 h-6 text-white" />
                <p className="text-white font-medium text-sm">Delete</p>
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
