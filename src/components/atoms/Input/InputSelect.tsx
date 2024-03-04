"use client";

import React, { HTMLAttributes, useRef, useState } from "react";

import type { TInputOption } from "@/components/atoms/Input/InputType";
import { TInputProps, defaultInputClassName } from "./InputUtil";
import InputLabel from "./InputLabel";
import InputHelperText from "./InputHelperText";
import InputErrorMessage from "./InputErrorMessage";
import { Check, X } from "lucide-react";
import { Sleep } from "@/lib/sleep";

type TInputSelectProps = Omit<TInputProps, "value" | "onChange"> & {
    options: TInputOption[];
    customSelectClassName?: HTMLAttributes<HTMLSelectElement>["className"];
    multiple?: boolean;
    value?: TInputOption[];
    onChange: (value: TInputOption[]) => void;
    disabled?: boolean;
};

const InputSelect = ({ multiple = false, ...props }: TInputSelectProps) => {
    const [optionShow, setOptionShow] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useState<string>("");
    const [inputActive, setInputActive] = useState<boolean>(false);
    const [optionActive, setOptionActive] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const values = props.value?.map((val) => val.value) ?? [];

    const value = multiple ? values : values[0] || "";

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

    const removeValueHandler = (id: string) => {
        const newValue = [...props.value!];

        const optionIndex = newValue.findIndex((val) => val.value === id);

        newValue.splice(optionIndex, 1);

        props.onChange([...newValue]);
    };

    return (
        <div className="flex flex-col">
            {props.label && (
                <InputLabel
                    label={props.label}
                    required={props.required}
                    labelClassName={props.customLabelClassName}
                    requiredClassName={props.customRequiredClassName}
                />
            )}
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
                value={value}
                hidden
                onChange={() => {}}
            >
                <option key={props.placeholder || props.name} value={""} hidden>
                    {props.placeholder}
                </option>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {!inputActive && !multiple && (
                <div
                    className={`${defaultInputClassName} h-10 ${
                        props.disabled ? "bg-[#b1aeae4d]" : ""
                    } bg-white ${
                        props.value?.length ? "text-black" : "text-gray-400"
                    } cursor-default`}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        if (props.disabled) {
                            return;
                        }
                        setInputActive(true);
                        searchInputRef.current!.focus();
                    }}
                >
                    {props.value?.[0]?.label || props.placeholder}
                </div>
            )}

            {!inputActive && multiple && (
                <div
                    className={`${defaultInputClassName} h-10 ${
                        props.disabled ? "bg-[#b1aeae4d]" : ""
                    } bg-white text-gray-400 `}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        if (props.disabled) {
                            return;
                        }
                        setInputActive(true);

                        // this Sleep needed to wait inputActive state changed first,
                        // then ref can detected to gain the focus
                        Sleep(50).then(() => {
                            searchInputRef.current!.focus();
                        });
                    }}
                >
                    {props.placeholder}
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
                onBlur={(e) => {
                    e.preventDefault();
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
                                    <X
                                        className="w-4 h-4 text-black cursor-pointer"
                                        onClick={() => {
                                            removeValueHandler(val.value);
                                        }}
                                    />
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
                            className="p-2 w-full cursor-pointer hover:bg-blue-100 flex flex-row gap-4"
                        >
                            <div className="w-6 h-6">
                                {props.value?.some(
                                    (item) => item.value === option.value
                                ) && <Check className="w-6 h-6" />}
                            </div>
                            {option.label}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default InputSelect;
