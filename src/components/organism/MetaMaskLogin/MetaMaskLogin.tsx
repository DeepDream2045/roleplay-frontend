"use client";

import { useEthereum } from "@/app/EthereumProvider";
import React from "react";

type MetaMaskLoginProps = {};

const MetaMaskLogin = (props: MetaMaskLoginProps) => {
    const { connectWalletHandler } = useEthereum();

    return (
        <div
            className="text-black-900 font-semibold cursor-pointer"
            onClick={connectWalletHandler}
        >
            Connect Wallet
        </div>
    );
};

export default MetaMaskLogin;
