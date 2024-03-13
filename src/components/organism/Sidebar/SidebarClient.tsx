"use client";
import { usePathname } from "next/navigation";
import NavLink from "../../atoms/NavLink";
import {
    Home,
    PlusCircle,
    MessageCircleMore,
    User,
    LogOut,
    PanelLeftCloseIcon,
    LucidePanelLeftOpen,
} from "lucide-react";
import { useEffect, useState } from "react";

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
            <aside
                id="sidebar"
                // className={`flex flex-col h-screen sticky top-0 max-w-16 ${sidebarSize} py-4 border-r`}
                className={`flex flex-row w-full z-20 top-0 justify-between items-center sticky py-4 px-4`}
            >
                {/* Sidebar Mobile for toggle */}
                {/* Toggle Button */}
                <LucidePanelLeftOpen
                    className="w-6 h-6"
                    onClick={toggleSidebar}
                />
                {/* Website Name */}
                <h2 className="text-2xl">ComChat</h2>
                {/* Search Icon */}
                <div className="flex w-6 h-6"></div>
            </aside>
            {/* Navbar that will show relatively */}
            <nav
                className={`h-screen absolute flex flex-col w-full transform duration-500 ${
                    open ? "translate-x-0" : "-translate-x-full"
                } bg-red-500 dark:bg-blue-500 px-4 py-4 z-50`}
            >
                {/* Close Menu */}
                <div className="flex flex-row justify-between items-center">
                    <div className="text-3xl">Chat Com</div>
                    <div className="p-2 w-16" onClick={toggleSidebar}>
                        <PanelLeftCloseIcon className="w-8 h-8" />
                    </div>
                </div>
                <div className="flex flex-col mt-8">
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
                        label="Create"
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
