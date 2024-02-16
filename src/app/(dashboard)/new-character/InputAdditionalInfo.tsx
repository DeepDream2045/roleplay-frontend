import InputErrorMessage from "@/components/atoms/Input/InputErrorMessage";
import React, { useState, useRef } from "react";

export type InputAdditionalInfoProps = {
    label?: string;
    name: string;
    errorMsg?: string[];
};
const InputAdditionalInfo = ({
    label,
    name,
    errorMsg,
}: InputAdditionalInfoProps) => {
    const [text, setText] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            if (file.type !== "text/plain") {
                alert("Only TXT files are allowed.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const newText = e.target?.result
                    ? e.target.result.toString()
                    : "";
                setText(
                    (currentText) =>
                        currentText + (currentText ? "\n" : "") + newText
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
                    accept=".txt"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                />
            </div>
            <div>
                <textarea
                    className="w-full h-64 p-2 border border-gray-300"
                    name={name}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="The text from uploaded files will appear here..."
                ></textarea>
            </div>
            {errorMsg && <InputErrorMessage message={errorMsg} />}
        </div>
    );
};

export default InputAdditionalInfo;
