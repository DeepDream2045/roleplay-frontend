"use client";

import InputErrorMessage from "@/components/atoms/Input/InputErrorMessage";
import InputHelperText from "@/components/atoms/Input/InputHelperText";
import React, { useState, useRef } from "react";

export type InputAdditionalInfoProps = {
    label?: string;
    name: string;
    errorMsg?: string[];
    defaultValue?: string | null;
    placeholder?: string;
    helperText?: string;
    acceptedFile?: ("text/plain" | "application/json")[];
};
const InputAdditionalInfo = ({
    label,
    name,
    errorMsg,
    defaultValue,
    placeholder = "The text from uploaded files will appear here...",
    helperText,
    acceptedFile = ["text/plain"],
}: InputAdditionalInfoProps) => {
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
                <span className="text-gray-700">
                    {label || "Additional Info"}
                </span>
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
                    className="w-full h-64 p-2 border border-gray-300"
                    name={name}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholder}
                ></textarea>
            </div>
            {errorMsg && <InputErrorMessage message={errorMsg} />}
        </div>
    );
};

export default InputAdditionalInfo;
