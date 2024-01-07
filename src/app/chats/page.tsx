import { ReactElement } from "react";
import ChatsLayout from "@/app/chats/layout";
import { auth } from "@/lib/authConfig";
import Conversation from "./Conversation";
import AskToLogin from "@/components/organism/AskToLogin";

interface ChatsProps {}

async function Chats(props: ChatsProps) {
    const session = await auth();

    if (!session) {
        return (
            <AskToLogin
                title={"Sign in to see your chats"}
                subtitle={
                    "Once you sign in, you'll see your conversations with characters here."
                }
            />
        );
    }

    return <Conversation />;
}

Chats.getLayout = (page: ReactElement) => {
    return <ChatsLayout>{page}</ChatsLayout>;
};

export default Chats;
