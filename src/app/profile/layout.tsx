import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";

type ProfileLayoutProps = PropsWithChildren<{}>;

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="flex gap-4 max-w-full">
            <Sidebar />
            <div
                style={{ maxWidth: "calc(100vw - 16rem)" }}
                className="min-h-screen flex flex-1 flex-col max-w-full flex-wrap overflow-clip"
            >
                <main className="flex flex-1 max-w-full">{children}</main>
            </div>
        </div>
    );
}
