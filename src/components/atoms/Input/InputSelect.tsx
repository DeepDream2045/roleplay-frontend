"use client";

import React, { HTMLAttributes, useRef, useState } from "react";

import type { TInputOption } from "@/components/atoms/Input/InputType";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputErrorMessage from "./InputErrorMessage";

type TInputSelectProps = Omit<TInputProps, "value"> & {
    options: TInputOption[];
    customSelectClassName?: HTMLAttributes<HTMLSelectElement>["className"];
    multiple?: boolean;
    value?: TInputOption[];
};

const InputSelect = ({ multiple = false, ...props }: TInputSelectProps) => {
    const [optionShow, setOptionShow] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>("");
    const [inputActive, setInputActive] = useState<boolean>(false);
    const [optionActive, setOptionActive] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const optionContainerShowHandler = () => {
        setOptionShow((prev) => !prev);
    };

    const handleInput: React.MouseEventHandler<HTMLDivElement> = (e) => {
        // prevent default
        e.preventDefault();
        setInputActive(true);

        const elem = e.currentTarget as HTMLDivElement;
        const value = elem.dataset.value;

        console.log(elem);
    };

    const onChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchKey(e.target.value);
    };

    return (
        <div className="flex flex-col">
            {props.label && <InputLabel label={props.label} />}
            {props.helperText && (
                <InputHelperText helperText={props.helperText} />
            )}

            <select
                multiple={multiple}
                id={props.id}
                name={props.name}
                className={`${defaultInputClassName} ${props.customSelectClassName}`}
                defaultValue={
                    props.value
                        ? props.value.map((val) => val.value).join(",")
                        : ""
                }
                hidden
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <input
                ref={searchInputRef}
                type="text"
                value={searchKey}
                placeholder={props.placeholder}
                className={defaultInputClassName}
                onChange={onChangeSearch}
                onMouseDown={(e) => {
                    if (inputActive) {
                        e.preventDefault();
                        searchInputRef.current?.blur();
                    }
                }}
                onFocus={() => {
                    setInputActive(true);
                }}
                onBlur={() => {
                    setInputActive(false);
                }}
            />
            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}
            <div className="flex flex-row flex-wrap max-w-full w-full">
                {props.value &&
                    props.value.map((val) => {
                        return (
                            <div
                                key={val.value}
                                className="px-4 py-2 flex text-base"
                            >
                                {val.label}
                            </div>
                        );
                    })}
            </div>

            <div
                className={`flex flex-col w-full overflow-x-auto rounded-lg  ${
                    inputActive
                        ? "max-h-32 border border-gray-300 mt-4"
                        : "max-h-0 none"
                } transition-all duration-300`}
            >
                {props.options
                    .filter((item) => {
                        return item.label
                            .toLowerCase()
                            .includes(searchKey.toLowerCase());
                    })
                    .map((option) => (
                        <div
                            key={option.value}
                            data-value={option.value}
                            data-type={`${props.name}-select-option`}
                            onMouseDown={handleInput}
                            className="p-2 w-full cursor-pointer hover:bg-blue-100"
                        >
                            {option.label}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default InputSelect;
