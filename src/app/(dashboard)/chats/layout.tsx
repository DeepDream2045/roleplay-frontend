import { getAuthSession } from "@/lib/authSession";
import { PropsWithChildren } from "react";
import ChatList from "./ChatList";
import { TRoomInfo, getRoomInfoAction } from "@/lib/chatAction";
import { getAuthGuestSession } from "@/lib/authGuestSession";

type TProtectedPageLayoutProps = PropsWithChildren<{}>;

export default async function ProtectedPageLayout({
    children,
}: TProtectedPageLayoutProps) {
    const session = await getAuthSession();

    let rooms: TRoomInfo[] = [];
    if (session?.access) {
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
        } else {
            rooms = roomData.rooms;
        }
    } else {
        const guestSession = await getAuthGuestSession();
        rooms = guestSession.chatRooms || [];
    }

    return (
        <div className="flex flex-1 flex-row w-full max-h-dvh">
            <ChatList rooms={rooms} />
            <div className="flex flex-1 flex-col justify-center items-center">
                {children}
            </div>
        </div>
    );
}
