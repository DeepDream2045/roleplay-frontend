import Image from "next/image";
import CharacterCard from "@/app/components/dashboard/CharacterCard";
import { getPublicCharacterInfoAction } from "@/lib/characterInfoAction";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { notFound } from "next/navigation";

async function ProfilePage({
    params: { userId },
}: {
    params: { userId: string };
}) {
    const characterData = await getPublicCharacterInfoAction();
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

    const filteredCharacters = characters.filter((val) => {
        return String(val.user.id) === userId;
    });

    if (filteredCharacters.length === 0) {
        return notFound();
    }

    const userData = filteredCharacters[0].user;

    return (
        <div className="flex flex-1 flex-col px-10 py-6">
            <div className="flex flex-row gap-10">
                <div>
                    <Image
                        src={
                            userData?.profile_image &&
                            userData.profile_image.length > 0
                                ? userData.profile_image.includes("http")
                                    ? userData?.profile_image
                                    : `${MAIN_API_BASE_URL}${userData.profile_image}`
                                : "/images/default-image-placeholder.webp"
                        }
                        width={150}
                        height={150}
                        alt="User profile picture"
                        className="w-44 rounded-2xl aspect-square object-cover object-center"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <h1>@{userData.username}</h1>
                        <p className="text-base">{`No biography provided. Set one by clicking 'Account'.`}</p>
                    </div>
                </div>
            </div>
            <hr className="border-t my-4" />
            <div>
                <h2>Characters</h2>
                {/* All Character */}
                <div className="flex flex-wrap flex-row">
                    {filteredCharacters.map((val, index) => {
                        return (
                            <CharacterCard
                                id={`${val.id}`}
                                key={`${val.id}`}
                                imageSrc={
                                    val.image
                                        ? `${MAIN_API_BASE_URL}${val.image}`
                                        : "/images/default-image-placeholder.webp"
                                }
                                profileImageSrc={
                                    val?.user?.profile_image &&
                                    val.user.profile_image.length > 0
                                        ? val.user.profile_image.includes(
                                              "http"
                                          )
                                            ? val.user.profile_image
                                            : `${MAIN_API_BASE_URL}${val.user.profile_image}`
                                        : "/images/default-image-placeholder.webp"
                                }
                                name={val.character_name}
                                profileName={val.user.full_name}
                                characterInformation={val}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
