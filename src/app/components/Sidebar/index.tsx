// app/components/Sidebar.tsx

import { ReactNode } from "react";
import Link from "next/link";

interface SidebarProps {
    children?: ReactNode;
}

export function Sidebar(props: SidebarProps) {
    return (
        <aside className="sticky top-0 h-screen flex flex-col justify-between">
            <div className="flex">
                <Link
                    href="/dashboard"
                    className={`flex p-4 "bg-gray-900 text-white"`}
                >
                    Dashboard
                </Link>

                <Link
                    href="/dashboard/settings"
                    className={`flex p-4 "bg-gray-900 text-white"`}
                >
                    Settings
                </Link>
            </div>

            {props.children}
        </aside>
    );
}
