"use client";

import ProfileEditModal from "@/app/(dashboard)/profile/ProfileEditModal";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ProfileInfoCardProps = {
    userId?: string;
    userPhotoProfileSrc?: string | null;
    userFullName?: string;
    userUsername: string;
    userBio?: string;
    visitor?: boolean;
    totalData: number;
    totalDataType: "Chatbot(s)" | "Lora(s)";
};

const ProfileInfoCard = ({
    userPhotoProfileSrc,
    userFullName,
    userUsername,
    userBio,
    visitor = false,
    totalData,
    totalDataType,
    userId,
}: ProfileInfoCardProps) => {
    const [editModalShow, setEditModalShow] = useState<boolean>(false);

    if (!userBio || userBio.length === 0) {
        if (visitor) {
            userBio = "This account has no biography provided";
        } else {
            userBio =
                "No biography provided. Set one by clicking 'Edit Profile'.";
        }
    }

    if (!userFullName || userFullName.length === 0) {
        if (visitor) {
            userFullName = "This account has no full name provided";
        } else {
            userFullName =
                "No full name provided. Set one by clicking 'Edit Profile'.";
        }
    }

    return (
        <>
            <div className="min-h-60 max-h-60 flex flex-row gap-6">
                <div className="flex flex-row p-6 gap-6 min-w-168 max-w-168 bg-white-0 dark:bg-black-900 rounded-xl">
                    <div className="h-48 w-48 aspect-square relative">
                        <Image
                            src={convertImageSrcUtil(userPhotoProfileSrc)}
                            fill
                            alt={`${userUsername} Photo Profile`}
                            priority
                            className="rounded-xl object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-3xl leading-tight text-black-900 dark:text-white-200 font-bold">
                                {userFullName}
                            </p>
                            <p className="text-xs leading-normal text-black-900 dark:text-white-200 font-medium">
                                @{userUsername}
                            </p>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <p className="text-sm leading-normal text-black-900 dark:text-white-200 font-medium">
                                {userBio}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-2 ${
                        visitor
                            ? "min-w-60 max-w-60 min-h-60 max-h-60"
                            : "min-w-40 max-w-40 min-h-60 max-h-60"
                    } `}
                >
                    <div
                        className={`flex flex-col gap-2.5 flex-1 justify-center items-center bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 rounded-xl select-none cursor-pointer ${
                            visitor ? "hidden" : ""
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setEditModalShow(true);
                        }}
                    >
                        <Pencil className="w-6 h-6" />
                        <p className="text-xs leading-normal font-bold">
                            Edit Profile
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5 flex-1 justify-center items-center bg-white-0 dark:bg-black-900 rounded-xl cursor-default select-none">
                        <p className="text-2xl leading-none font-bold">
                            {totalData}
                        </p>
                        <p className="text-xs leading-normal font-bold">
                            {totalDataType}
                        </p>
                    </div>
                </div>
            </div>
            {editModalShow && (
                <ProfileEditModal
                    onClose={() => {
                        setEditModalShow(false);
                    }}
                    profileData={{
                        id: userId,
                        full_name: userFullName,
                        username: userUsername,
                        profile_image: userPhotoProfileSrc,
                    }}
                />
            )}
        </>
    );
};

export default ProfileInfoCard;
