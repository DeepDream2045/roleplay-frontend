import { getAuthSession } from "@/lib/authSession";
import SidebarClient from "./SidebarClient";

interface SidebarProps {}

export default async function Sidebar({}: SidebarProps) {
    const session = await getAuthSession();

    return <SidebarClient isLogin={!!session?.access} />;
}
