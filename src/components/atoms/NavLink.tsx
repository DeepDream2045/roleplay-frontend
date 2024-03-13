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
            className={`h-10 flex flex-1 flex-row items-center py-2 text-base ${
                active ? "text-blue-500" : ""
            }`}
        >
            <Icon className="w-8 h-8 mr-2" />
            {!iconOnly && <p className="text-3xl">{label}</p>}
        </Link>
    );
}
