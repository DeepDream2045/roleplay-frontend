import { ReactElement } from "react";
import DashboardLayout from "./layout";
import RecentChatCard from "../components/dashboard/RecentChatCard";
import Category from "../components/dashboard/Category";
import CharacterCard from "../components/dashboard/CharacterCard";
import { getPublicCharacterInfoAction } from "@/lib/characterInfoAction";
import { TRoomInfo, getRoomInfoAction } from "@/lib/chatAction";
import { getPublicTagInfoListAction } from "@/lib/tagAction";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { Tag } from "@/types/action";

interface DashboardProps {}

async function Dashboard(props: DashboardProps) {
    const characterData = await getPublicCharacterInfoAction();

    if (characterData.hasError) {
        console.log("character data has error");
        return (
            <div className="flex flex-1 flex-col">
                <h1>{characterData.errorMsg[0]}</h1>
                {characterData.errorMsg?.slice(1).map((val: string) => {
                    return <p key={val}>{val}</p>;
                })}
            </div>
        );
    }

    let rooms: TRoomInfo[] = [];

    // const roomData = await getRoomInfoAction();
    // if (!roomData.hasError) {
    //     rooms = roomData.rooms;
    // }

    const tagData = await getPublicTagInfoListAction();

    let tags: Tag[] = [];
    if (!tagData.hasError) {
        tags = tagData.tags!;
    }

    return (
        <main className="relative flex flex-1 flex-col pl-10 py-10 gap-10">
            <div
                className="sticky top-0 z-10 py-4 flex flex-row overflow-x-scroll gap-4 bg-white-200 scrollbar-hide"
                style={{
                    maxWidth: "calc(100vw - var(--dynamic-rem) - 5rem)",
                }}
            >
                <Category key={"Featured"} active>
                    Featured
                </Category>
                <Category key={"Recommended"}>Recommended</Category>
                <Category key={"All"}>All</Category>
                <Category key={"Recently Added"}>Recently Added</Category>
                <Category key={"Top"}>Top</Category>
                {tags.map((item) => {
                    return <Category key={item.id}>{item.tag_name}</Category>;
                })}
            </div>
            <div className="flex flex-row flex-wrap flex-1 gap-10">
                {characterData.characters!.map((val, index) => {
                    return (
                        <CharacterCard
                            key={`char-${val.id}`}
                            id={String(val.id)}
                            chatbotImageSrc={val.image}
                            chatbotName={val.character_name}
                            chatbotDescription={val.short_bio}
                            creatorImageSrc={val.user.profile_image}
                            creatorUsername={val.user.username}
                            chatbotTotalReviews={0}
                            chatbotLastModifiedDate={val.modified_date}
                        />
                    );
                })}
            </div>
            {/* <div className="pl-11 mt-4 flex flex-1 flex-col pb-12"> */}
            {/* Recent Chat */}
            {/* {rooms.length > 0 && (
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center gap-6 ">
                            <h3 className="text-2xl font-semibold">
                                Continue your chat
                            </h3>
                            <span className="text-base font-medium">
                                {"View All >"}
                            </span>
                        </div>
                        <div className="mt-8 flex flex-row gap-8 flex-wrap max-h-[18rem] overflow-hidden flex-grow-0">
                            {rooms.map((val, index) => {
                                return (
                                    <RecentChatCard
                                        roomId={val.room_id}
                                        key={val.room_id}
                                        imageSrc={
                                            val.character?.image
                                                ? `${val.character?.image}`
                                                : "/images/default-image-placeholder.webp"
                                        }
                                        name={val.group_name}
                                        message={
                                            val.chatroom.length > 0
                                                ? val.chatroom[0]
                                                      .character_message
                                                : "Let's do the chat"
                                        }
                                        time=""
                                    />
                                );
                            })}
                        </div>
                    </div>
                )} */}
            {/* Tags */}

            {/* All Character */}
            {/* </div> */}
        </main>
    );
}

Dashboard.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
