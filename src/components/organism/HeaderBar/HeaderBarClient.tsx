"use client";

import ThemeSwitch from "@/components/molecules/ThemeSwitch/ThemeSwitch";
import Image from "next/image";
import React from "react";
import MetaMaskLogin from "../MetaMaskLogin/MetaMaskLogin";
import { useEthereum } from "@/app/EthereumProvider";
import convertImageSrcUtil from "@/util/convertImageSrcUtil";

type HeaderBarClientProps = {
    loginData:
        | {
              isLogin: false;
              user: {};
          }
        | {
              isLogin: true;
              user: {
                  username: string | undefined;
                  userImgSrc: string | undefined | null;
              };
          };
};

const HeaderBarClient = (props: HeaderBarClientProps) => {
    const { userAddress, balance } = useEthereum();

    return (
        <div className="flex min-h-18 h-18 flex-row w-full justify-end bg-white-0 dark:bg-black-900 px-10 items-center">
            <div className="flex flex-row gap-10 items-center">
                <div>
                    <ThemeSwitch />
                </div>
                {props.loginData.isLogin && (
                    <div className="bg-white-100 py-2 px-5 text-black-500 rounded-lg">
                        {!userAddress && <MetaMaskLogin />}
                        {userAddress && (
                            <h6 className="font-bold">
                                {balance?.substring(0, 5)} ETH
                            </h6>
                        )}
                    </div>
                )}
                {userAddress && (
                    <div className="bg-white-100 py-2 px-5 text-black-500 rounded-lg">
                        <h6 className="font-bold">
                            {userAddress.substring(0, 7)}...
                        </h6>
                    </div>
                )}
                <div className="bg-white-100 py-2 px-5 rounded-lg text-black-500">
                    <h6 className="font-bold">
                        {props.loginData.isLogin
                            ? props.loginData.user.username
                            : "Guest"}
                    </h6>
                </div>
                <div className="relative w-12.5 h-12.5 rounded-lg">
                    <Image
                        src={
                            props.loginData.isLogin
                                ? convertImageSrcUtil(
                                      props.loginData.user.userImgSrc
                                  )
                                : "/images/profile-placeholder.png"
                        }
                        alt="Guest Profile Picture"
                        fill
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderBarClient;
