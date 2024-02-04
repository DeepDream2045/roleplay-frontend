"use client";

import Button from "@/components/atoms/Button";
import React, { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { AuthSession } from "@/types/action";

type Props = {
    profileData: AuthSession["user"];
};

const ProfileEditButton = (props: Props) => {
    const [editModalShow, setEditModalShow] = useState<boolean>(false);

    return (
        <>
            <Button
                size="medium"
                color="primary"
                variant="fill"
                onClick={() => {
                    setEditModalShow(true);
                }}
            >
                Edit Profile
            </Button>
            {editModalShow && (
                <ProfileEditModal
                    onClose={() => {
                        setEditModalShow(false);
                    }}
                    profileData={props.profileData}
                />
            )}
        </>
    );
};

export default ProfileEditButton;
