"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import Button from "@/components/atoms/Button";
import { deleteCharacterAction } from "@/lib/characterInfoAction";
import { TRoomInfo, deleteRoomAction } from "@/lib/chatAction";
import { X } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
    onClose: () => void;
    roomData: TRoomInfo;
};

const RoomDeleteModal = ({ onClose, roomData }: Props) => {
    const deleteRoomActionWithId = deleteRoomAction.bind(
        null,
        String(roomData.room_id)
    );

    const [state, formAction] = useFormState<any, any>(deleteRoomActionWithId, {
        hasError: false,
        errorMsg: {},
    });

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-col bg-white max-w-md min-w-md rounded-lg p-8">
                    <header className=" py-4 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2>Delete Chat</h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="mt-8 flex flex-col pb-12">
                        <h3>Are you sure you want delete the chat?</h3>
                        <form action={formAction}>
                            <div className="mt-4 flex flex-row gap-4">
                                <Button
                                    variant="fill"
                                    color="primary"
                                    size="fullWidth"
                                    type="button"
                                    className="flex-1"
                                    onClick={onClose}
                                    loadingText="Cancel"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="fill"
                                    color="primary"
                                    size="fullWidth"
                                    type="submit"
                                    className="flex-1"
                                >
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default RoomDeleteModal;