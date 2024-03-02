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
            <div className="flex flex-row gap-2 items-center justify-between">
                <div
                    className="flex flex-col gap-2 justify-center items-center cursor-pointer"
                    onClick={() => {
                        setEditModalShow(true);
                    }}
                >
                    <Pencil className="w-6 h-6" />
                    <p>Edit</p>
                </div>
                <div
                    className="flex flex-col gap-2 justify-center items-center cursor-pointer"
                    onClick={() => {
                        setDeleteModalShow(true);
                    }}
                >
                    <Trash2 className="w-6 h-6" />
                    <p>Delete</p>
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
