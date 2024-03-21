// EthereumContext.tsx
"use client";

declare var window: { ethereum: any };

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";

interface IEthereumContext {
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    userAddress: string | null;
    balance: string | null;
    connectWalletHandler: () => Promise<void>;
}

const defaultState: IEthereumContext = {
    provider: null,
    signer: null,
    userAddress: null,
    balance: null,
    connectWalletHandler: () => new Promise((resolve, rejects) => {}),
};

const EthereumContext = createContext<IEthereumContext>(defaultState);

interface EthereumProviderProps {
    children: ReactNode;
}

export const EthereumProvider = ({ children }: EthereumProviderProps) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
        null
    );
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    const connectWalletHandler = async () => {
        if (window.ethereum) {
            const ethProvider = new ethers.BrowserProvider(window.ethereum);
            const ethSigner = await ethProvider.getSigner();
            const address = await ethSigner.getAddress();
            const balance = await ethProvider.getBalance(address);

            setProvider(ethProvider);
            setSigner(ethSigner);
            setUserAddress(address);
            setBalance(String(balance));
        } else {
            alert("Please install MetaMask first to connect");
        }
    };

    return (
        <EthereumContext.Provider
            value={{
                provider,
                signer,
                userAddress,
                balance,
                connectWalletHandler,
            }}
        >
            {children}
        </EthereumContext.Provider>
    );
};

export const useEthereum = () => useContext(EthereumContext);
