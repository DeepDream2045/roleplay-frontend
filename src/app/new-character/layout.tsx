// app/new-character/layout.tsx

import { PropsWithChildren } from "react";

import Sidebar from "@/components/organism/Sidebar/Sidebar";

type NewCharacterLayoutProps = PropsWithChildren<{}>;

export default function NewCharacterLayout({
    children,
}: NewCharacterLayoutProps) {
    return (
        <div className="flex gap-4">
            <Sidebar />
            <div className="min-h-screen flex flex-1 flex-col">{children}</div>
        </div>
    );
}
