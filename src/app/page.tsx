import Image from "next/image";
import Dashboard from "./dashboard/page";
import DashboardLayout from "./dashboard/layout";

export default function Home() {
    return (
        <DashboardLayout>
            <Dashboard />
        </DashboardLayout>
    );
}
