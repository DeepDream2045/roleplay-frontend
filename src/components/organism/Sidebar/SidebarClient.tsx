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
import ThemeSwitch from "@/components/molecules/ThemeSwitch/ThemeSwitch";

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

    const SidebarHeader = () =>
        pathName.includes("/chats") ? (
            <div className="flex flex-row gap-2 items-center justify-center h-18">
                <BrandLogo className="w-8 h-8 text-blue-500" />
            </div>
        ) : (
            <div className="flex flex-row gap-2 items-center justify-start h-18 pl-10">
                <BrandLogo className="w-8 h-8 text-blue-500" />
                <h3 className="text-5 leading-normal text-black-900 dark:text-white-200">
                    Comchat
                </h3>
            </div>
        );

    return (
        <>
            {/* Navbar that will show relatively */}
            <nav
                id="sidebar"
                className={`min-h-full max-h-full ${
                    pathName.includes("/chats")
                        ? "w-24 max-w-24"
                        : "w-56 max-w-56"
                } flex flex-col bg-white-0 dark:bg-black-900 transition-all pb-8 z-50`}
            >
                <SidebarHeader />
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
