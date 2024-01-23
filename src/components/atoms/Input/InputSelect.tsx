"use client";

import React, { HTMLAttributes, useRef, useState } from "react";

import type { TInputOption } from "@/components/atoms/Input/InputType";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputErrorMessage from "./InputErrorMessage";
import { X } from "lucide-react";

type TInputSelectProps = Omit<TInputProps, "value" | "onChange"> & {
    options: TInputOption[];
    customSelectClassName?: HTMLAttributes<HTMLSelectElement>["className"];
    multiple?: boolean;
    value?: TInputOption[];
    onChange: (value: TInputOption[]) => void;
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

        const elem = e.currentTarget as HTMLDivElement;
        const value = elem.dataset.value;
        const parseValue = JSON.parse(value!) as TInputOption;

        if (multiple) {
            // if multiple option list will stay to showed else will close after select
            setInputActive(true);
            const newValue = [...props.value!];

            // Check if option is already selected
            const optionIndex = newValue.findIndex(
                (val) => val.value === parseValue.value
            );

            // if selected value in props.value, remove it from props.value
            if (optionIndex >= 0) {
                // Remove option from selection
                newValue.splice(optionIndex, 1);
            } else {
                // if selected value not in props.value, add it to props.value

                // Add option to selection
                newValue.push(parseValue);
            }

            // Update value state
            props.onChange([...newValue]);
        } else {
            // if single option list will close after select
            setInputActive(false);
            searchInputRef.current?.blur();

            props.onChange([parseValue]);
        }
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
                className={`${defaultInputClassName} ${
                    props.customSelectClassName || ""
                }`}
                value={
                    props.value
                        ? multiple
                            ? props.value.map((val) => val.value)
                            : props.value[0]?.value || ""
                        : ""
                }
                hidden
                onChange={() => {}}
            >
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {!inputActive && (
                <div
                    className={`${defaultInputClassName} h-10 bg-white ${
                        props.value?.length ? "text-black" : "text-gray-400"
                    }`}
                    onMouseDown={() => {
                        setInputActive(true);
                        searchInputRef.current?.focus();
                    }}
                >
                    {props.value?.[0]?.label || props.placeholder}
                </div>
            )}
            <input
                ref={searchInputRef}
                type="text"
                value={searchKey}
                placeholder={props.placeholder}
                className={`${defaultInputClassName} min-w-[50%] ${
                    inputActive ? "" : "hidden"
                } `}
                onChange={onChangeSearch}
                onFocus={() => {
                    setInputActive(true);
                }}
                onMouseDown={(e) => {
                    if (inputActive) {
                        e.preventDefault();
                        searchInputRef.current?.blur();
                    }
                }}
                onBlur={() => {
                    setInputActive(false);
                }}
            />

            {props.errorMsg && <InputErrorMessage message={props.errorMsg} />}
            {multiple && (
                <div className="flex flex-row flex-wrap max-w-full w-full gap-2 mt-2">
                    {props.value &&
                        props.value.map((val) => {
                            return (
                                <div
                                    key={val.value}
                                    className="px-4 py-2 flex text-base flex-row gap-2 items-center border rounded-md"
                                >
                                    {val.label}
                                    <X className="w-4 h-4 text-black cursor-pointer" />
                                </div>
                            );
                        })}
                </div>
            )}

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
                            data-value={JSON.stringify(option)}
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
