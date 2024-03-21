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
import { useEffect, useState } from "react";
import BrandLogo from "@/../public/icons/BrandLogo.svg";

interface SidebarClientProps {
    isLogin: boolean;
}

export default function SidebarClient({ isLogin }: SidebarClientProps) {
    const pathName = usePathname();
    const [open, setOpen] = useState(false);

    // Sidebar toggle function
    const toggleSidebar = () => setOpen((prev) => !prev);

    const sidebarSize = pathName.includes("/chats")
        ? "min-w-16 max-w-16"
        : "min-w-16 max-w-16 lg:min-w-52 lg:max-w-52";

    // Set the CSS variable inside useEffect
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--dynamic-rem",
            pathName.includes("/chats") ? "4rem" : "13rem"
        );
    }, [pathName]); // Dependency array ensures this runs only when pathName changes

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
        <>
            {/* Navbar that will show relatively */}
            <nav
                id="sidebar"
                className={`min-h-full max-h-full w-56 max-w-56 flex flex-col bg-white-0 dark:bg-blue-500 pb-8 z-50`}
            >
                <div className="flex flex-row gap-2 items-center justify-center h-18 pl-8">
                    <BrandLogo className="w-10 h-10 text-blue-500" />
                    <h3 className="text-7 leading-normal">Comchat</h3>
                </div>
                <div className="flex flex-col pt-4">
                    <NavLink
                        path="/"
                        Icon={Home}
                        label="Home"
                        active={pathName === "/"}
                        iconOnly={pathName.includes("/chats")}
                    />
                    <NavLink
                        path="/create/chatbot"
                        Icon={PlusCircle}
                        label="Create"
                        active={pathName.includes("/create")}
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
                        path="/profile?character=Chatbot"
                        Icon={User}
                        label="Profile"
                        active={pathName.includes("/profile")}
                        iconOnly={pathName.includes("/chats")}
                    />
                    {isLogin && (
                        <NavLink
                            path="/signout"
                            Icon={LogOut}
                            label="Logout"
                            iconOnly={pathName.includes("/chats")}
                        />
                    )}
                </div>
            </nav>
        </>
    );
}
