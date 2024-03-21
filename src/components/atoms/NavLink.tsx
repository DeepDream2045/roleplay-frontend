import Link from "next/link";
import { ElementType } from "react";

interface NavLink {
    path: string;
    Icon: ElementType;
    label: string;
    active?: boolean;
    iconOnly?: boolean;
}

export default function NavLink({
    path,
    Icon,
    label,
    active = false,
    iconOnly = false,
}: NavLink) {
    return (
        <Link
            href={path}
            className={`min-h-15 max-h-15 flex flex-1 flex-row justify-start items-center  text-base ${
                active ? "text-blue-500" : ""
            } ${iconOnly ? "" : "gap-10"}`}
        >
            <div
                className={`min-w-[6px] h-full rounded-r-[10px] ${
                    active ? "bg-blue-500" : ""
                }`}
            />
            <div
                className={`flex flex-row flex-1 gap-6 ${
                    iconOnly ? "justify-center" : "justify-start"
                } items-center`}
            >
                <Icon
                    className={`w-6 h-6 ${
                        active ? "text-blue-500" : "text-black-300"
                    }`}
                />
                {!iconOnly && (
                    <p
                        className={`text-4 leading-normal  ${
                            active ? "text-blue-500" : "text-black-300"
                        }`}
                    >
                        {label}
                    </p>
                )}
            </div>
        </Link>
    );
}
