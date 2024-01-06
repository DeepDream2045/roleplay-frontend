// "use client";

import { Home, PlusCircle, MessageCircleMore, User } from "lucide-react";
import Link from "next/link";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
    return (
        <aside className="flex flex-col h-screen sticky top-0 min-w-52 max-w-52 py-4 border-r">
            <div className="h-10 flex flex-row items-center px-4">
                <h2 className="text-xl">Chatbot AI</h2>
            </div>
            <div className="flex flex-col mt-6 ">
                <Link
                    href="/"
                    className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                >
                    <Home className="w-6 h-6 mr-2" />
                    Home
                </Link>
                <Link
                    href="/new-character"
                    className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                >
                    <PlusCircle className="w-6 h-6 mr-2" />
                    Create Character
                </Link>
                <Link
                    href="/chats"
                    className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                >
                    <MessageCircleMore className="w-6 h-6 mr-2" />
                    Chats
                </Link>
                <Link
                    href="/"
                    className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                >
                    <User className="w-6 h-6 mr-2" />
                    Profile
                </Link>
            </div>
        </aside>
    );
}
