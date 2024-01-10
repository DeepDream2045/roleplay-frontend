// app/new-character/layout.tsx

import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";

type ChatsLayoutProps = PropsWithChildren<{}>;

export default function ChatsLayout({ children }: ChatsLayoutProps) {
    return (
        <div className="flex flex-1 min-w-full">
            <Sidebar />
            <div className="flex flex-1 max-w-full min-h-screen">
                <main className="flex flex-1 max-w-full min-h-full flex-col items-center">
                    {children}
                </main>
            </div>
        </div>
    );
}
