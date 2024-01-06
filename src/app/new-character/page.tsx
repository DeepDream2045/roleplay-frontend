import { ReactElement } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import NewCharacterForm from "./form";
import AskToLogin from "./AskToLogin";
import { auth } from "@/lib/authConfig";

interface NewCharacterProps {}

async function NewCharacter(props: NewCharacterProps) {
    const session = await auth();

    if (!session) {
        return <AskToLogin />;
    }

    console.log({ session });

    return (
        <>
            <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                <div className="max-w-screen-md w-full ">
                    <h4>New Character</h4>
                    <h5 className="font-normal">Draft</h5>
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
