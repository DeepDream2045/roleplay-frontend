import { ReactElement } from "react";
import DashboardLayout from "./layout";
import RecentChatCard from "../components/dashboard/RecentChatCard";
import Category from "../components/dashboard/Category";
import CharacterCard from "../components/dashboard/CharacterCard";
import { getCharacterInfoAction } from "@/lib/characterInfoAction";

interface DashboardProps {}

async function Dashboard(props: DashboardProps) {
    const characterData = await getCharacterInfoAction();

    if (characterData.hasError) {
        return (
            <div className="flex flex-1 flex-col">
                <h1>{characterData.errorMsg[0]}</h1>
                {characterData.errorMsg?.slice(1).map((val: string) => {
                    return <p key={val}>{val}</p>;
                })}
            </div>
        );
    }

    return (
        <div className="px-2 mt-8 flex flex-1 flex-col max-w-full pb-12">
            {/* Recent Chat */}
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
                    {Array(6)
                        .fill("x")
                        .map((val, index) => {
                            return (
                                <RecentChatCard
                                    key={index + 1}
                                    imageSrc="/images/Levi Ackerman Profile Picture.webp"
                                    name="Levi Ackerman Character Chat"
                                    message="I may have a serious exterior, but deep down I just
                            want someone to share my cape with while slaying
                            Titans."
                                    time="11:42 PM"
                                />
                            );
                        })}
                </div>
            </div>
            {/* Tags */}
            <div className="sticky top-14 bg-neutral-50 z-10 py-8 flex flex-row gap-2 overflow-x-auto overflow-hidden flex-grow-0 flex-shrink-0">
                <Category active>Featured</Category>
                <Category>Recommended</Category>
                <Category>All</Category>
                <Category>Recently Added</Category>
                <Category>Top</Category>
                <Category>Male</Category>
                <Category>Female</Category>
                <Category>Anime</Category>
                <Category>Game</Category>
                <Category>Books</Category>
                <Category>K-pop</Category>
                <Category>Celebrity</Category>
                <Category>Villain</Category>
                <Category>Hero</Category>
                <Category>Historical</Category>
            </div>

            {/* All Character */}
            <div className="flex flex-wrap flex-row">
                {characterData.characters!.map((val, index) => {
                    return (
                        <CharacterCard
                            key={`char-${index + 1}`}
                            imageSrc={val.image || ""}
                            profileImageSrc={
                                val.user.imageUrl ||
                                "/images/default-character-placeholder-full.webp"
                            }
                            name={val.character_name || "Sasuke"}
                            profileName={val.user.name || "lilianne"}
                            timeString="107.3K . 1 month ago"
                        />
                    );
                })}
            </div>
        </div>
    );
}

Dashboard.getLayout = (page: ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
