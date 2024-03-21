"use client";

import InputErrorMessage from "@/components/atoms/Input/InputErrorMessage";
import InputHelperText from "@/components/atoms/Input/InputHelperText";
import React, { useState, useRef } from "react";
import InputLabel from "./InputLabel";
import { defaultInputClassName } from "./InputUtil";

export type InputTextAreaWithUploadFileProps = {
    label?: string;
    id: string;
    name: string;
    errorMsg?: string[];
    defaultValue?: string | null;
    placeholder?: string;
    helperText?: string;
    rows?: number;
    acceptedFile?: ("text/plain" | "application/json")[];
};
const InputTextAreaWithUploadFile = ({
    label,
    id,
    name,
    errorMsg,
    defaultValue,
    placeholder = "The text from uploaded files will appear here...",
    helperText,
    rows,
    acceptedFile = ["text/plain"],
}: InputTextAreaWithUploadFileProps) => {
    const defaultRows = 5;
    const actualRows = rows ?? defaultRows;
    const [text, setText] = useState(defaultValue || "");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            if (
                !acceptedFile.includes(
                    file.type as "text/plain" | "application/json"
                )
            ) {
                alert("Please upload valid file");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const newText = e.target?.result
                    ? e.target.result.toString()
                    : "";
                setText(
                    (currentText) =>
                        `${currentText}${currentText ? "\n" : ""}${newText}`
                );
            };
            reader.readAsText(file);
        });

        // Reset the file input after reading files
        event.target.value = "";
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                {label && <InputLabel label={label} />}
                <span
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={handleFileUploadClick}
                >
                    add file
                </span>
                <input
                    type="file"
                    accept={acceptedFile.join(",")}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                />
            </div>
            {helperText && <InputHelperText helperText={helperText} />}
            <div>
                <textarea
                    id={id}
                    className={` min-h-[${
                        1.3125 * actualRows
                    }rem] ${defaultInputClassName} `}
                    name={name}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholder}
                    rows={actualRows}
                />
            </div>
            {errorMsg && <InputErrorMessage message={errorMsg} />}
        </div>
    );
};

export default InputTextAreaWithUploadFile;
