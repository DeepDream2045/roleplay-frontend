"use client";

import * as React from "react";
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getAuthSession } from "@/lib/authSession";
import { createGuestUser, getAuthGuestSession } from "@/lib/authGuestSession";
import {
    GUEST_CHAT_ROOM_DATA_LOCAL_STORAGE_KEY,
    GUEST_DATA_LOCAL_STORAGE_KEY,
} from "@/constants/constants";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: "Roleplay Project",
    projectId: process.env.RAINBOW_KIT_PROJECT_ID || "YOUR_PROJECT_ID",
    wallets: [
        ...wallets,
        {
            groupName: "Other",
            wallets: [argentWallet, trustWallet, ledgerWallet],
        },
    ],
    chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
            ? [sepolia]
            : []),
    ],
    ssr: true,
});

const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
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

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default Providers;
