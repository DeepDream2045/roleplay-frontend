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

    const roomData = await getRoomInfoAction();
    let rooms: TRoomInfo[] = [];
    if (!roomData.hasError) {
        rooms = roomData.rooms;
    }

    const tagData = await getPublicTagInfoListAction();

    let tags: Tag[] = [];
    if (!tagData.hasError) {
        tags = tagData.tags!;
    }

    return (
        <main className="flex flex-1 max-w-full flex-col">
            <header className="sticky top-0 flex flex-1 w-full bg-neutral-50 py-2 justify-center z-10">
                <input
                    type="text"
                    placeholder="Search"
                    className="flex w-7/12 border rounded-lg h-10 pl-4"
                />
            </header>

            <div className="px-2 mt-8 flex flex-1 flex-col max-w-full pb-12">
                {/* Recent Chat */}
                {rooms.length > 0 && (
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
                )}
                {/* Tags */}
                <div className="sticky top-14 bg-neutral-50 z-10 py-8 flex flex-row gap-2 overflow-x-auto overflow-hidden flex-grow-0 flex-shrink-0">
                    <Category key={"Featured"} active>
                        Featured
                    </Category>
                    <Category key={"Recommended"}>Recommended</Category>
                    <Category key={"All"}>All</Category>
                    <Category key={"Recently Added"}>Recently Added</Category>
                    <Category key={"Top"}>Top</Category>
                    {tags.map((item) => {
                        return (
                            <Category key={item.id}>{item.tag_name}</Category>
                        );
                    })}
                </div>

                {/* All Character */}
                <div className="flex flex-1 flex-row gap-4 flex-wrap  ">
                    {characterData.characters!.map((val, index) => {
                        return (
                            <CharacterCard
                                key={`char-${val.id}`}
                                id={String(val.id)}
                                imageSrc={
                                    val.image
                                        ? `${MAIN_API_BASE_URL}${val.image}`
                                        : "/images/default-image-placeholder.webp"
                                }
                                profileImageSrc={
                                    val.user.profile_image
                                        ? `${MAIN_API_BASE_URL}${val.user.profile_image}`
                                        : "/images/default-character-placeholder-full.webp"
                                }
                                name={val.character_name}
                                profileName={val.user.full_name}
                                characterInformation={val}
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

Dashboard.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
