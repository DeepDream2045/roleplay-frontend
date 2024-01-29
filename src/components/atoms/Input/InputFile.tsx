"use client";

import Image from "next/image";
import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { TInputProps } from "./InputUtil";
import ModalWrapper from "@/app/components/ModalWrapper";
import { ImageIcon, Wand2Icon, X } from "lucide-react";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import InputErrorMessage from "./InputErrorMessage";

type TInputFileProps = Omit<TInputProps, "value"> & {
    value: InputHTMLAttributes<HTMLInputElement>["value"];
};

type TInputFileModalProps = {
    onClose: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
    value: string | undefined;
};

const InputFileModal = (props: TInputFileModalProps) => {
    const handleUploadImage = () => {
        props.onClose();
    };

    return (
        <ModalWrapper>
            <div
                className="flex flex-col flex-1 justify-center items-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.48)" }}
            >
                <div className="flex flex-col bg-white max-w-md min-w-md rounded-lg">
                    <header className=" py-4 px-6 ">
                        <div className="h-10 flex flex-row justify-between items-center">
                            <h2>Upload Image</h2>
                            <X
                                className="w-6 h-6 cursor-pointer"
                                onClick={props.onClose}
                            />
                        </div>
                    </header>
                    <div className="flex flex-col py-2 px-6 gap-4">
                        <div className="flex flex-col items-center ">
                            <Image
                                src={
                                    props.value ||
                                    "/images/default-image-placeholder.webp"
                                }
                                width={250}
                                height={250}
                                alt="Levi Ackerman profile picture"
                                className="w-72 rounded-2xl aspect-square object-cover"
                                priority
                            />
                        </div>

                        <div className="flex gap-12 flex-row justify-center">
                            <div
                                onClick={() => {
                                    props.inputRef.current?.click();
                                }}
                                className="w-16 aspect-square flex flex-col items-center justify-center rounded-full bg-neon-carrot-100 cursor-pointer"
                            >
                                <ImageIcon className="w-8 aspect-square" />
                            </div>
                            <div className="w-16 aspect-square flex flex-col items-center justify-center rounded-full bg-neon-carrot-100 cursor-not-allowed">
                                <Wand2Icon className="w-8 aspect-square" />
                            </div>
                        </div>

                        <div className=" flex flex-row justify-end gap-4">
                            <button
                                type="button"
                                className="text-sm h-10 px-6 w-fit rounded-lg font-semibold leading-normal "
                                onClick={props.onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-sm h-10 px-6 w-fit rounded-lg font-semibold leading-normal text-white bg-blue-500"
                                onClick={handleUploadImage}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

const InputFile = (props: TInputFileProps) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [inputValue, setInputValue] = useState<File | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal((prev) => !prev);
    };

    useEffect(() => {
        const getImage = async () => {
            const blob = await new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", `${MAIN_API_BASE_URL}${props.value}`);
                xhr.responseType = "blob";
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = () => {
                    resolve(undefined);
                };
                xhr.send();
            });

            let file;
            if (blob) {
                file = new File([blob as BlobPart], props.value as string, {
                    type: `image/${String(props.value).split(".")[-1]}`,
                });
            }

            setInputValue(file);
        };

        if (props.value) {
            getImage();
        }
    }, [props.value]);

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                <Image
                    src={value || "/images/default-image-placeholder.webp"}
                    width={300}
                    height={300}
                    alt="character profile picture"
                    className="w-72 rounded-2xl aspect-square object-cover"
                    priority
                />
                <div
                    className="font-semibold flex flex-col text-blue-500 cursor-pointer"
                    onClick={handleModal}
                >
                    {props.label}
                </div>
                {props.errorMsg && (
                    <InputErrorMessage message={props.errorMsg} />
                )}
                <input
                    type="file"
                    hidden
                    id={props.id}
                    name={props.name}
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            const file = e.target.files[0];
                            setValue(URL.createObjectURL(file));
                        }
                        handleModal();
                    }}
                    defaultValue={inputValue?.name}
                    ref={inputRef}
                />
            </div>
            {showModal && (
                <InputFileModal
                    onClose={handleModal}
                    value={value}
                    inputRef={inputRef}
                />
            )}
        </>
    );
};

export default InputFile;
