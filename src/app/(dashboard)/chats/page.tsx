import Conversation from "./Conversation";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";

interface ChatsProps {}

async function Chats(props: ChatsProps) {
    const session = await getAuthSession();

    if (!session?.access) {
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

export default Chats;
