"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { getAuthSession } from "@/lib/authSession";
import { createGuestUser, getAuthGuestSession } from "@/lib/authGuestSession";
import {
    GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
    GUEST_DATA_LOCAL_STORAGE_KEY,
} from "@/constants/constants";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    useEffect(() => {
        const guestHandlers = async () => {
            const session = await getAuthSession();
            const guestSession = await getAuthGuestSession();
            if (!session.access) {
                if (!guestSession?.user?.id) {
                    const guestData = await createGuestUser();
                    if (!guestData.hasError) {
                        localStorage.setItem(
                            GUEST_DATA_LOCAL_STORAGE_KEY,
                            JSON.stringify(guestData.data)
                        );

                        localStorage.setItem(
                            GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
                            JSON.stringify([])
                        );
                    }
                } else {
                    const roomData = localStorage.getItem(
                        GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY
                    );

                    if (!roomData) {
                        localStorage.setItem(
                            GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
                            JSON.stringify([])
                        );
                    }
                }
            }
        };

        guestHandlers();
    }, []);

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
