import { auth } from "@/lib/authConfig";
import SidebarClient from "./SidebarClient";

interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
    const session = await auth();

    return <SidebarClient isLogin={!!session} />;
}
