import { ReactElement } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import NewCharacterForm from "./form";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";

interface NewCharacterProps {}

async function NewCharacter(props: NewCharacterProps) {
    const session = await getAuthSession();
    const modelData = await getModelInfoListAction();

    if (modelData.hasError) {
        return <h1>Oppss something wrong</h1>;
    }

    const models = modelData.models!;

    const formattedModel: TInputOption[] = models.map((item) => {
        return { label: item.model_name, value: String(item.id) };
    });

    if (!session?.access) {
        return (
            <AskToLogin
                title="Sign in to create new AI characters"
                subtitle="Once you sign in, you can create new AI characters to talk to and interact."
            />
        );
    }

    return (
        <>
            <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                <div className="max-w-screen-md w-full ">
                    <h4>New Character</h4>
                    <h5 className="font-normal">Draft</h5>
                </div>
            </header>
            <main className="flex flex-1 max-w-full flex-col items-center">
                <NewCharacterForm models={formattedModel} />
            </main>
        </>
    );
}

NewCharacter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCharacter;
