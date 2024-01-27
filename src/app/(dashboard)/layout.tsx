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
                <div className="flex flex-col flex-1">{children}</div>
            </div>
        </div>
    );
}