import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getCharacterInfoAction } from "@/lib/characterInfoAction";

import { CharacterInfoType } from "@/types/action";
import { redirect } from "next/navigation";
import { getLoraInfoAction } from "@/lib/loraInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";
import ProfileCharacterDisplay from "./ProfileCharacterDisplay";
import ProfileInfoCard from "@/components/organism/ProfileInfoCard/ProfileInfoCard";
import DisplaySwitcher from "@/components/organism/DisplaySwitcher/DisplaySwitcher";

export type TProfilePageProps = {
    searchParams: {
        character: "Chatbot" | "LoraAdaptor" | undefined;
    };
};
async function ProfilePage({ searchParams: { character } }: TProfilePageProps) {
    const session = await getAuthSession();
    let characters: CharacterInfoType[] = [];
    let loraAdaptors: TLoraInfo[] = [];

    const currentView = character || "Chatbot";

    if (!session?.access) {
        return (
            <AskToLogin
                title={"Sign in to see your profile"}
                subtitle={
                    "Once you sign in, you'll see your conversations with characters here."
                }
            />
        );
    }

    if (!character || !["Chatbot", "LoraAdaptor"].includes(character)) {
        redirect("/profile?character=Chatbot");
    }

    if (currentView === "Chatbot") {
        const characterData = await getCharacterInfoAction();
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

        if (Array.isArray(characterData.characters)) {
            characters = characterData.characters!;
        }
    } else if (character === "LoraAdaptor") {
        const loraAdaptorData = await getLoraInfoAction();

        if (!loraAdaptorData) {
            return (
                <>
                    <h1>{"Something Wrong Happened"}</h1>
                </>
            );
        }

        if ("hasError" in loraAdaptorData && loraAdaptorData.hasError) {
            return (
                <>
                    <h1>{loraAdaptorData.errorMsg[0]}</h1>
                    {loraAdaptorData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (
            !("hasError" in loraAdaptorData) &&
            Array.isArray(loraAdaptorData.data)
        ) {
            loraAdaptors = loraAdaptorData.data;
        }
    }

    return (
        <div className="flex flex-1 flex-col px-10 py-10">
            <ProfileInfoCard
                userUsername={session.user!.username!}
                userFullName={session.user!.full_name}
                userPhotoProfileSrc={session.user?.profile_image}
                userBio={""}
                totalData={
                    currentView === "LoraAdaptor"
                        ? loraAdaptors.length
                        : characters.length
                }
                totalDataType={
                    currentView === "LoraAdaptor" ? "Adaptor(s)" : "Chatbot(s)"
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
