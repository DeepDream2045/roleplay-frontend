"use client";

import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { TLoraInfo } from "@/types/loraInfoAction";
import LoraAdaptorEditModal from "./LoraAdaptorEditModal";
import LoraAdaptorDeleteModal from "./LoraAdaptorDeleteModal";

type Props = {
    models: TInputOption[];
    loraAdaptorData: TLoraInfo;
};

const LoraAdaptorEditDeleteAction = (props: Props) => {
    const [editModalShow, setEditModalShow] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);

    return (
        <>
            <div className="flex flex-row w-full items-center gap-4">
                <div
                    className="flex flex-row gap-2 justify-center items-center cursor-pointer px-7 py-1 bg-blue-500 text-white-200 rounded-md"
                    onClick={() => {
                        setEditModalShow(true);
                    }}
                >
                    <p className="text-white-200">EDIT</p>
                </div>
                <div
                    className="flex flex-row gap-2 justify-center items-center cursor-pointer px-7 py-1 bg-red-200 text-white-200 rounded-md"
                    onClick={() => {
                        setDeleteModalShow(true);
                    }}
                >
                    <p>DELETE</p>
                </div>
            </div>
            {editModalShow && (
                <LoraAdaptorEditModal
                    onClose={() => {
                        setEditModalShow(false);
                    }}
                    models={props.models}
                    loraAdaptorData={props.loraAdaptorData}
                />
            )}
            {deleteModalShow && (
                <LoraAdaptorDeleteModal
                    onClose={() => {
                        setDeleteModalShow(false);
                    }}
                    loraAdaptorData={props.loraAdaptorData}
                />
            )}
        </>
    );
};

export default LoraAdaptorEditDeleteAction;
