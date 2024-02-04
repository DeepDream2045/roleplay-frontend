"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import InputFile from "@/components/atoms/Input/InputFile";
import InputText from "@/components/atoms/Input/InputText";
import { AuthSession } from "@/types/action";
import { X } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";
import Button from "@/components/atoms/Button";
import { updateProfileAction } from "@/lib/profileAction";

type Props = {
    onClose: () => void;
    profileData: AuthSession["user"];
};

const ProfileEditModal = ({ onClose, profileData }: Props) => {
    const [state, formAction] = useFormState<any, any>(updateProfileAction, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-1 py-4 px-8 flex-col bg-white min-w-2xl max-w-2xl rounded-lg">
                    <header className=" py-4 px-6 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2 className="flex flex-1 justify-center">
                                Update Profile
                            </h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="px-2 mt-8 flex flex-1 flex-col pb-12">
                        <form action={formAction}>
                            <InputFile
                                name="profile_image"
                                id="profile_image"
                                label="Update Profile Image"
                                value={profileData?.profile_image || undefined}
                                errorMsg={state.errorMsg.profile_image}
                            />

                            {/* Character Form */}
                            <div className="flex flex-col mt-8 gap-4">
                                <InputText
                                    name="full_name"
                                    id="full_name"
                                    label="Full Name"
                                    placeholder="Your full name"
                                    required
                                    defaultValue={profileData?.full_name}
                                    errorMsg={state.errorMsg.full_name}
                                />

                                <InputText
                                    id="username"
                                    name="username"
                                    label="Username"
                                    defaultValue={profileData?.username}
                                    placeholder="Your Username"
                                    required
                                    errorMsg={state.errorMsg.username}
                                />
                            </div>
                            {state.hasError && (
                                <p className="text-red-500 mt-4">
                                    Please check the input
                                </p>
                            )}
                            <div className="mt-8">
                                <Button
                                    variant="fill"
                                    color="primary"
                                    size="fullWidth"
                                    type="submit"
                                >
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ProfileEditModal;
