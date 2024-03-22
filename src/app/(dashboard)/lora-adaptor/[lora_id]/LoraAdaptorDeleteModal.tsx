"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import Button from "@/components/atoms/Button";
import { deleteLoraAction } from "@/lib/loraInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import { X } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

type Props = {
    onClose: () => void;
    loraAdaptorData: TLoraInfo;
};

const LoraAdaptorDeleteModal = ({ onClose, loraAdaptorData }: Props) => {
    const deleteLoraAdaptorActionWithCharId = deleteLoraAction.bind(
        null,
        loraAdaptorData.id
    );

    const [state, formAction] = useFormState<any, any>(
        deleteLoraAdaptorActionWithCharId,
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
                <div className="flex flex-col bg-white-0 dark:bg-black-900 text-black-900 dark:text-white-200 max-w-lg rounded-lg py-8 px-12">
                    <header className=" py-4 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2>Delete Lora Adaptor</h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={onClose}
                            />
                        </div>
                    </header>
                    <div className="mt-8 flex flex-col pb-12">
                        <h3>Are you sure you want delete the lora adaptor?</h3>
                        <form action={formAction}>
                            <div className="mt-10 flex flex-row gap-4">
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
                                    className="flex-1 bg-red-500"
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

export default LoraAdaptorDeleteModal;
