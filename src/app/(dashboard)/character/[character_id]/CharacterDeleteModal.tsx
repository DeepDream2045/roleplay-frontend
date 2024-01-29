"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import { deleteCharacterAction } from "@/lib/characterInfoAction";
import { CharacterInfoType } from "@/types/action";
import { X } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
    onClose: () => void;
    characterData: CharacterInfoType;
};

const CharacterDeleteModal = ({ onClose, characterData }: Props) => {
    const updateCharacterActionWithCharId = deleteCharacterAction.bind(
        null,
        String(characterData.id)
    );

    const [state, formAction] = useFormState<any, any>(
        updateCharacterActionWithCharId,
        {
            hasError: false,
            errorMsg: {},
        }
    );

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center max-h-full p-8"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-col bg-white max-w-md min-w-md rounded-lg p-8">
                    <header className=" py-4 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2>Delete Character</h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="mt-8 flex flex-col pb-12">
                        <h3>Are you sure you want delete the character?</h3>
                        <form action={formAction}>
                            <div className="mt-4 flex flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 h-10 rounded-lg bg-blue-500 text-white font-semibold "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-10 rounded-lg bg-blue-500 text-white font-semibold "
                                >
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default CharacterDeleteModal;
