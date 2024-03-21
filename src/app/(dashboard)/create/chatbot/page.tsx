import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getTagInfoListAction } from "@/lib/tagAction";
import DisplaySwitcher from "@/components/organism/DisplaySwitcher/DisplaySwitcher";
import CreateChatbotCharacter from "./CreateChatbotCharacter";

interface CreateChatbotPageProps {}

async function CreateChatbotPage(props: CreateChatbotPageProps) {
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

    const formattedModel: TInputOption[] = models.map((item) => {
        return { label: item.model_name, value: String(item.id) };
    });

    const tagData = await getTagInfoListAction();

    if (tagData.hasError) {
        return (
            <>
                <h1>{tagData.errorMsg[0]}</h1>
                {tagData.errorMsg?.slice(1).map((val: string) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    const tags = tagData.tags!;

    const formattedTag: TInputOption[] = tags.map((item) => {
        return { label: item.tag_name, value: String(item.id) };
    });

    return (
        <div className="flex flex-col flex-1 px-10 py-10">
            <DisplaySwitcher
                active="Chatbot"
                chatbotHref="/create/chatbot"
                loraHref="/create/lora"
            />

            <CreateChatbotCharacter
                formattedModel={formattedModel}
                formattedTag={formattedTag}
            />
        </div>
    );
}

export default CreateChatbotPage;
