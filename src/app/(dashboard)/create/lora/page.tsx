import { ReactElement } from "react";
import DashboardLayout from "@/app/(dashboard)/layout";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import CreateLoraCharacter from "./CreateLoraCharacter";
import DisplaySwitcher from "@/components/organism/DisplaySwitcher/DisplaySwitcher";

interface NewCharacterProps {}

async function NewCharacter(props: NewCharacterProps) {
    const session = await getAuthSession();
    if (!session?.access) {
        return (
            <AskToLogin
                title="Sign in to create new AI characters"
                subtitle="Once you sign in, you can create new AI characters to talk to and interact."
            />
        );
    }

    const modelData = await getModelInfoListAction();

    if (modelData.hasError) {
        return (
            <>
                <h1>{modelData.errorMsg[0]}</h1>
                {modelData.errorMsg?.slice(1).map((val) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const models = modelData.models!;

    const formattedModels: TInputOption[] = models.map((item) => {
        return { label: item.model_name, value: String(item.id) };
    });

    return (
        <div className="flex flex-col flex-1 px-10 py-10">
            <DisplaySwitcher
                active="LoraAdaptor"
                chatbotHref="/create/chatbot"
                loraHref="/create/lora"
            />

            <CreateLoraCharacter formattedModel={formattedModels} />
        </div>
    );
}

NewCharacter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCharacter;
