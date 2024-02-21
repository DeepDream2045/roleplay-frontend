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
            if (!session.access && !guestSession?.user?.id) {
                console.log("creating guest user");

                await createGuestUser();
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
