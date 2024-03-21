// ThemeSwitch.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="flex w-full justify-center pl-6">
            <div
                className={`relative flex flex-row h-10 w-24 cursor-pointer items-center justify-between bg-white-100 rounded-full px-2 dark:bg-black-500`}
                onClick={toggleTheme}
            >
                <div
                    className={`absolute block min-w-7 min-h-7 ${
                        theme === "light" ? "-translate-x-1" : "translate-x-14"
                    } transform rounded-full bg-white-0 transition-all`}
                />
                <div className="relative w-5 h-5 aspect-square">
                    <Image
                        src="/icons/light-mode.svg"
                        alt="Light Mode"
                        fill
                        className={`select-none ${
                            theme === "light"
                                ? "text-blue-500"
                                : "text-black-100"
                        }`}
                    />
                </div>

                <div className="relative w-5 h-5 aspect-square">
                    <Image
                        src="/icons/dark-mode.svg"
                        alt="Dark Mode"
                        fill
                        className={`select-none ${
                            theme === "dark"
                                ? "text-blue-500"
                                : "text-black-100"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitch;
