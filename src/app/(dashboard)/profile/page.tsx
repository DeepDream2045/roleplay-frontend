import Button from "@/components/atoms/Button";
import Image from "next/image";
import CharacterCard from "../../components/dashboard/CharacterCard";
import AskToLogin from "@/components/organism/AskToLogin/AskToLogin";
import { getAuthSession } from "@/lib/authSession";
import { getCharacterInfoAction } from "@/lib/characterInfoAction";

async function ProfilePage() {
    const session = await getAuthSession();

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

    const characters = characterData.characters!;

    return (
        <div className="flex flex-1 flex-col px-10 py-6">
            <div className="flex flex-row gap-10">
                <div>
                    <Image
                        src={
                            session.user?.profile_image &&
                            session.user.profile_image.length > 0
                                ? session.user?.profile_image
                                : "/images/default-image-placeholder.webp"
                        }
                        width={150}
                        height={150}
                        alt="User profile picture"
                        className="w-44 rounded-2xl aspect-square"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <h1>@{session.user?.full_name}</h1>
                        <p className="text-base">{`No biography provided. Set one by clicking 'Account'.`}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button size="medium" color="primary" variant="fill">
                            Edit Profile
                        </Button>
                        <Button size="medium" color="secondary" variant="fill">
                            Setting
                        </Button>
                    </div>
                </div>
            </div>
            <hr className="border-t my-4" />
            <div>
                <h2>Characters</h2>
                <p>
                    Characters created by you. Others can only see public
                    characters.
                </p>
                {/* All Character */}
                <div className="flex flex-wrap flex-row">
                    {characters.map((val, index) => {
                        return (
                            <CharacterCard
                                id={`${val.id}`}
                                key={`${val.id}`}
                                imageSrc={
                                    val.image ||
                                    "/images/default-image-placeholder.webp"
                                }
                                profileImageSrc={
                                    val.user.profile_image ||
                                    "/images/default-image-placeholder.webp"
                                }
                                name={val.character_name}
                                profileName={val.user.full_name}
                                timeString=""
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
