import Image from "next/image";
import CharacterCard from "@/app/components/dashboard/CharacterCard";
import { getPublicCharacterInfoAction } from "@/lib/characterInfoAction";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { notFound } from "next/navigation";
import { CharacterInfoType } from "@/types/action";
import ProfileInfoCard from "@/components/organism/ProfileInfoCard/ProfileInfoCard";
import { TLoraInfo } from "@/types/loraInfoAction";
import DisplaySwitcher from "@/components/organism/DisplaySwitcher/DisplaySwitcher";
import ProfileCharacterDisplay from "../ProfileCharacterDisplay";

async function ProfilePage({
    params: { username },
    searchParams: { character },
}: {
    params: { username: string };
    searchParams: {
        character: "Chatbot" | "LoraAdaptor" | undefined;
    };
}) {
    let characters: CharacterInfoType[] = [];
    let loraAdaptors: TLoraInfo[] = [];
    const currentView = character || "Chatbot";
    let userData;

    if (currentView === "Chatbot") {
        const characterData = await getPublicCharacterInfoAction();
        if (characterData) {
            if (characterData.hasError) {
                return (
                    <>
                        <h1>{characterData.errorMsg[0]}</h1>
                        {characterData.errorMsg?.slice(1).map((val: string) => {
                            return <p key={val}>{val}</p>;
                        })}
                    </>
                );
            }

            characters = characterData.characters!;
        }

        const filteredCharacters = characters.filter((val) => {
            return val.user.username === username;
        });

        console.log({ filteredCharacters });

        if (filteredCharacters.length === 0) {
            return notFound();
        }

        userData = filteredCharacters[0].user;
    }

    if (!userData) {
        return notFound();
    }

    return (
        <div className="flex flex-1 flex-col px-10 py-10">
            <ProfileInfoCard
                userUsername={userData.username!}
                userFullName={userData.full_name}
                userPhotoProfileSrc={userData.profile_image}
                userBio={""}
                totalData={
                    currentView === "LoraAdaptor"
                        ? loraAdaptors.length
                        : characters.length
                }
                visitor
                totalDataType={
                    currentView === "LoraAdaptor" ? "Lora(s)" : "Chatbot(s)"
                }
            />
            <div className="flex mt-9">
                <DisplaySwitcher
                    active={currentView}
                    chatbotHref="/profile?character=Chatbot"
                    loraHref="/profile?character=LoraAdaptor"
                />
            </div>

            <ProfileCharacterDisplay
                characterType={currentView}
                characters={characters}
                loraAdaptors={loraAdaptors}
            />
        </div>
    );
}

export default ProfilePage;
