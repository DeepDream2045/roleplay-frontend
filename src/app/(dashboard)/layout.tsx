// app/dashboard/layout.tsx
import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";
import HeaderBar from "@/components/organism/HeaderBar/HeaderBar";
import FooterBar from "@/components/organism/FooterBar/FooterBar";

type DashboardLayoutProps = PropsWithChildren<{}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex flex-row max-w-dvw min-w-dvw min-h-dvh max-h-dvh ">
            <Sidebar />
            <div
                className="flex flex-1 flex-col min-h-full max-h-full bg-white-100 "
                // style={{
                //     maxWidth: "calc(100vw - var(--dynamic-rem))",
                // }}
            >
                <HeaderBar />
                <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-hide">
                    {children}
                </div>
                <FooterBar />
            </div>
        </div>
    );
}
