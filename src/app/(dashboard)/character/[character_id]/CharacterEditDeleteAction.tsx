"use client";

import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import CharacterEditModal from "./CharacterEditModal";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { CharacterInfoType } from "@/types/action";
import CharacterDeleteModal from "./CharacterDeleteModal";

type Props = {
    characterId: number;
    models: TInputOption[];
    tags: TInputOption[];
    characterData: CharacterInfoType;
};

const CharacterEditDeleteAction = (props: Props) => {
    const [editModalShow, setEditModalShow] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);

    return (
        <>
            <div className="flex flex-row gap-2 items-center justify-between">
                <div
                    className="flex flex-col gap-2 justify-center items-center cursor-pointer bg-blue-500 text-white-0 py-1 px-7 rounded-md"
                    onClick={() => {
                        setEditModalShow(true);
                    }}
                >
                    <p>Edit</p>
                </div>
                <div
                    className="flex flex-col gap-2 justify-center items-center cursor-pointer bg-red-500 text-white-0 py-1 px-7 rounded-md"
                    onClick={() => {
                        setDeleteModalShow(true);
                    }}
                >
                    <p>Delete</p>
                </div>
            </div>
            {editModalShow && (
                <CharacterEditModal
                    onClose={() => {
                        setEditModalShow(false);
                    }}
                    models={props.models}
                    tags={props.tags}
                    characterData={props.characterData}
                />
            )}
            {deleteModalShow && (
                <CharacterDeleteModal
                    onClose={() => {
                        setDeleteModalShow(false);
                    }}
                    characterData={props.characterData}
                />
            )}
        </>
    );
};

export default CharacterEditDeleteAction;
