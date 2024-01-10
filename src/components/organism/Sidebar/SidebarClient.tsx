"use client";
import { usePathname } from "next/navigation";
import NavLink from "../../atoms/NavLink";
import {
    Home,
    PlusCircle,
    MessageCircleMore,
    User,
    LogOut,
} from "lucide-react";

interface SidebarClientProps {
    isLogin: boolean;
}

export default function SidebarClient({ isLogin }: SidebarClientProps) {
    const pathName = usePathname();

    const sidebarSize = pathName.includes("/chats")
        ? "min-w-16 max-w-16"
        : "min-w-52 max-w-52";

    const sidebarHeader = pathName.includes("/chats") ? (
        <div className="h-10 flex flex-row items-center px-4">
            <h4 className="text-sm bg-blue-300 p-1 rounded-full">CA</h4>
        </div>
    ) : (
        <div className="h-10 flex flex-row items-center px-4">
            <h2 className="text-xl">Chatbot AI</h2>
        </div>
    );
    return (
        <aside
            className={`flex flex-col h-screen sticky top-0 ${sidebarSize} py-4 border-r`}
        >
            {sidebarHeader}
            <div className="flex flex-col mt-6 ">
                <NavLink
                    path="/"
                    Icon={Home}
                    label="Home"
                    active={pathName === "/"}
                    iconOnly={pathName.includes("/chats")}
                />
                <NavLink
                    path="/new-character"
                    Icon={PlusCircle}
                    label="Create Character"
                    active={pathName.includes("/new-character")}
                    iconOnly={pathName.includes("/chats")}
                />
                <NavLink
                    path="/chats"
                    Icon={MessageCircleMore}
                    label="Chats"
                    active={pathName.includes("/chats")}
                    iconOnly={pathName.includes("/chats")}
                />
                <NavLink
                    path="/profile"
                    Icon={User}
                    label="Profile"
                    active={pathName.includes("/profile")}
                    iconOnly={pathName.includes("/chats")}
                />
                {isLogin && (
                    <NavLink
                        path="/api/auth/signout"
                        Icon={LogOut}
                        label="Logout"
                        iconOnly={pathName.includes("/chats")}
                    />
                )}
            </div>
        </aside>
    );
}
