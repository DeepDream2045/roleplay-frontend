import Link from "next/link";
import React from "react";

type DisplaySwitcherItemProps = {
    href: string;
    active?: boolean;
    label: string;
};

const DisplaySwitcherItem = ({
    href,
    active = false,
    label,
}: DisplaySwitcherItemProps) => {
    return (
        <Link
            href={href}
            className={`flex flex-row px-4 py-2 ${
                active ? "bg-blue-500 text-white-0" : "text-black-200"
            } rounded-md cursor-pointer`}
        >
            {label}
        </Link>
    );
};

export default DisplaySwitcherItem;
