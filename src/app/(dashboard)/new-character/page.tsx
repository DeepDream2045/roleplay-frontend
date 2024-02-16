import { ReactElement } from "react";
import DashboardLayout from "@/app/(dashboard)/layout";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getModelInfoListAction } from "@/lib/modelInfoAction";
import { TInputOption } from "@/components/atoms/Input/InputType";
import { getTagInfoListAction } from "@/lib/tagAction";
import PageClient from "./PageClient";

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
        <>
            <PageClient
                formattedModel={formattedModel}
                formattedTag={formattedTag}
            />
        </>
    );
}

NewCharacter.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default NewCharacter;
