import VerifyForm from "./VerifyForm";
import DashboardLayout from "@/app/(dashboard)/layout";

export default function LoginVerifyPage({
    params: { token },
}: {
    params: { token: string };
}) {
    return (
        <DashboardLayout>
            <div className="flex flex-1 flex-col">
                <VerifyForm token={token} />
            </div>
        </DashboardLayout>
    );
}
