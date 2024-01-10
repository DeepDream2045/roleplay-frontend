// app/dashboard/layout.tsx

import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";

type DashboardLayoutProps = PropsWithChildren<{}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex gap-4 max-w-full">
            <Sidebar />
            <div
                style={{ maxWidth: "calc(100vw - 16rem)" }}
                className="min-h-screen flex flex-1 flex-col max-w-full flex-wrap overflow-clip"
            >
                <header className="sticky top-0 flex flex-1 bg-neutral-50 py-2 justify-center z-10">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex w-7/12 border rounded-lg h-10 pl-4"
                    />
                </header>
                <main className="flex flex-1 max-w-full">{children}</main>
            </div>
        </div>
    );
}
