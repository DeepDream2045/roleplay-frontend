import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { PropsWithChildren } from "react";
import ChatList from "./ChatList";
import { getRoomInfoAction } from "@/lib/chatAction";

type TProtectedPageLayoutProps = PropsWithChildren<{}>;

export default async function ProtectedPageLayout({
    children,
}: TProtectedPageLayoutProps) {
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

    const roomData = await getRoomInfoAction();

    if (roomData.hasError) {
        return (
            <>
                <h1>{roomData.errorMsg[0]}</h1>
                {roomData.errorMsg?.slice(1).map((val) => {
                    return <p key={val}>{val}</p>;
                })}
            </>
        );
    }

    return (
        <div className="flex flex-1 flex-row w-full max-h-dvh">
            <ChatList rooms={roomData.rooms} />
            <div className="flex flex-1 flex-col justify-center items-center">
                {children}
            </div>
        </div>
    );
}
