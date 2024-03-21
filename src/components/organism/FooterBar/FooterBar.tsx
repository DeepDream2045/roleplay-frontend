import React from "react";

type Props = {};

const FooterBar = (props: Props) => {
    return (
        <div className="min-h-12.5 h-12.5 w-full max-w-full bg-white-0 dark:bg-black-900 flex flex-row justify-end px-10 items-center">
            <h5 className="text-sm font-normal leading-normal text-black-900 dark:text-white-200">
                © Comchat 2024
            </h5>
        </div>
    );
};

export default FooterBar;
