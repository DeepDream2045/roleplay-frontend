// app/new-character/layout.tsx

import { PropsWithChildren } from "react";

import Link from "next/link";
import { Home, PlusCircle, MessageCircleMore, User } from "lucide-react";

type ChatsLayoutProps = PropsWithChildren<{}>;

export default function ChatsLayout({ children }: ChatsLayoutProps) {
    return (
        <div className="flex flex-1 min-w-full">
            {/* Sidebar Icon Only */}
            <aside className="w-16 h-screen sticky top-0 py-4 border-r">
                <div className="h-10 flex flex-row items-center px-4">
                    <h2 className="text-sm bg-blue-300 p-1 rounded-full">CA</h2>
                </div>
                <div className="flex mt-6 flex-col items-center">
                    <Link
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        <Home className="w-6 h-6" />
                    </Link>
                    <Link
                        href="/new-character"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        <PlusCircle className="w-6 h-6" />
                    </Link>
                    <Link
                        href="/chats"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        <MessageCircleMore className="w-6 h-6" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        <User className="w-6 h-6" />
                    </Link>
                </div>
            </aside>
            <div className="flex flex-1 max-w-full min-h-screen">
                <main className="flex flex-1 max-w-full min-h-full flex-col items-center">
                    {children}
                </main>
            </div>
        </div>
    );
}
