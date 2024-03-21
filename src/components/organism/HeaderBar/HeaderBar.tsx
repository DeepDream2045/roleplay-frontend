import { getAuthSession } from "@/lib/authSession";
import React from "react";
import HeaderBarClient from "./HeaderBarClient";

type HeaderBarProps = {};

const HeaderBar = async (props: HeaderBarProps) => {
    const session = await getAuthSession();

    let loginData:
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

    if (session) {
        loginData = {
            isLogin: true,
            user: {
                username: session.user?.username,
                userImgSrc: session.user?.profile_image,
            },
        };
    } else {
        loginData = {
            isLogin: false,
            user: {},
        };
    }

    return <HeaderBarClient loginData={loginData} />;
};

export default HeaderBar;
