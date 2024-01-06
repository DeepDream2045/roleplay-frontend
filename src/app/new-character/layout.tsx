// app/new-character/layout.tsx

import { PropsWithChildren } from "react";

import Link from "next/link";
import { Home, PlusCircle, MessageCircleMore, User } from "lucide-react";

type NewCharacterLayoutProps = PropsWithChildren<{}>;

export default function NewCharacterLayout({
    children,
}: NewCharacterLayoutProps) {
    return (
        <div className="flex gap-4">
            <aside className="h-screen sticky top-0 min-w-52 max-w-52 py-4 border-r">
                <div className="h-10 flex flex-row items-center px-4">
                    <h2>Chatbot AI</h2>
                </div>
                <div className="flex mt-6 flex-col">
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
            <div className="min-h-screen flex flex-1 flex-col">{children}</div>
        </div>
    );
}
