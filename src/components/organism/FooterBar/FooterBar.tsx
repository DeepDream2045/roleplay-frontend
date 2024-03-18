import React from "react";

type Props = {};

const FooterBar = (props: Props) => {
    return (
        <div className="min-h-12.5 h-12.5 w-full max-w-full bg-white-0 flex flex-row justify-end px-10 items-center">
            <h5 className="text-sm font-normal leading-normal">
                © Comchat 2024
            </h5>
        </div>
    );
};

export default FooterBar;
