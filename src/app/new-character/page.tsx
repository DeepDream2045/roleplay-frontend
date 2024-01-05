import { ReactElement } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { getServerSession } from "next-auth";
import NewCharacterForm from "./form";

interface NewCharacterProps {}

async function NewCharacter(props: NewCharacterProps) {
    const session = await getServerSession();

    if (!session) {
        return <div>Not authenticated</div>;
    }

    return (
        <>
            <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                <div className="max-w-screen-md w-full ">
                    <div className="font-bold">New Character</div>
                    <div className="font-normal text-sm">Draft</div>
                </div>
            </header>
            <main className="flex flex-1 max-w-full flex-col items-center">
                <NewCharacterForm />
            </main>
        </>
    );
}

NewCharacter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCharacter;
