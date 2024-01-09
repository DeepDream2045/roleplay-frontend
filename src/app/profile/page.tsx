import Button from "@/components/atoms/Button";
import Image from "next/image";
import CharacterCard from "../components/dashboard/CharacterCard";

function ProfilePage() {
    return (
        <div className="flex flex-1 flex-col px-10 py-6">
            <div className="flex flex-row gap-10">
                <div>
                    <Image
                        src={"/images/default-image-placeholder.webp"}
                        width={150}
                        height={150}
                        alt="User profile picture"
                        className="w-44 rounded-2xl aspect-square"
                        priority
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <h1>@ersapta</h1>
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
                    {Array(18)
                        .fill("x")
                        .map((val, index) => {
                            return (
                                <CharacterCard
                                    key={`char-${index + 1}`}
                                    imageSrc="/images/Sasuke Uchiha Profile Picture.webp"
                                    profileImageSrc="/images/default-character-placeholder-full.webp"
                                    name="Sasuke"
                                    profileName="lilianne"
                                    timeString="107.3K . 1 month ago"
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
