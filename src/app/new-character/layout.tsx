// app/new-character/layout.tsx

import { PropsWithChildren } from "react";

import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";
import Link from "next/link";
import { Home, PlusCircle, MessageCircleMore, User } from "lucide-react";

type NewCharacterLayoutProps = PropsWithChildren<{}>;

export default function NewCharacterLayout({
    children,
}: NewCharacterLayoutProps) {
    return (
        <div className="grid grid-cols-12 gap-4">
            <aside className="col-span-2 h-screen sticky top-0 w-52 py-4 border-r">
                <div className="h-10 flex flex-row items-center px-4">
                    <h2 className="text-xl">Chatbot AI</h2>
                </div>
                <div className="flex mt-6 flex-col">
                    <Link
                        href="/dashboard"
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
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        <User className="w-6 h-6 mr-2" />
                        Profile
                    </Link>
                </div>
            </aside>
            <div className="col-span-10 min-h-screen">
                <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                    <div className="max-w-screen-md w-full ">
                        <div className="font-bold">New Character</div>
                        <div className="font-normal text-sm">Draft</div>
                    </div>
                </header>
                <main className="flex flex-1 max-w-full flex-col items-center">
                    {children}
                </main>
            </div>
        </div>
    );
}
