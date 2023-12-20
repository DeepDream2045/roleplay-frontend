// app/dashboard/layout.tsx

import { PropsWithChildren } from "react";

import { Header } from "@/app/components/Header";
import { Sidebar } from "@/app/components/Sidebar";
import Link from "next/link";

type DashboardLayoutProps = PropsWithChildren<{}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        Create Character
                    </Link>
                    <Link
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        Chats
                    </Link>
                    <Link
                        href="/dashboard"
                        className="h-10 flex flex-1 flex-row items-center px-4 py-2 text-base"
                    >
                        Profile
                    </Link>
                </div>
            </aside>
            <div className="col-span-10 min-h-screen">
                <header className="sticky top-0 flex flex-1 bg-neutral-50 py-2 justify-center z-10">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex w-7/12 border rounded-lg h-10 placeholder:pl-4"
                    />
                </header>
                <main className="flex flex-1 max-w-full">{children}</main>
            </div>
        </div>
    );
}
