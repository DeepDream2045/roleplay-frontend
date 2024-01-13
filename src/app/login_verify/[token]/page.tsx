import NewCharacterLayout from "@/app/new-character/layout";
import VerifyForm from "./VerifyForm";

export default function LoginVerifyPage({
    params: { token },
}: {
    params: { token: string };
}) {
    return (
        <NewCharacterLayout>
            <div className="flex flex-1 flex-col">
                <VerifyForm token={token} />
            </div>
        </NewCharacterLayout>
    );
}
