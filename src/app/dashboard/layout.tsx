// app/dashboard/layout.tsx

import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar";

type DashboardLayoutProps = PropsWithChildren<{}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex gap-4 max-w-vw">
            <Sidebar />
            <div className="min-h-screen flex flex-1 flex-col max-w-full flex-wrap">
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
