import { ReactElement } from "react";
import DashboardLayout from "./layout";
import RecentChatCard from "../components/dashboard/RecentChatCard";
import { getPublicCharacterInfoAction } from "@/lib/characterInfoAction";
import { TRoomInfo, getRoomInfoAction } from "@/lib/chatAction";
import { getPublicTagInfoListAction } from "@/lib/tagAction";
import { MAIN_API_BASE_URL } from "@/constants/environtment";
import { CharacterInfoType, Tag } from "@/types/action";
import DisplaySwitcher from "@/components/organism/DisplaySwitcher/DisplaySwitcher";
import ChatbotPageView from "./ChatbotPageView";
import { TLoraInfo } from "@/types/loraInfoAction";
import { getLoraPublicInfoAction } from "@/lib/loraInfoAction";
import LoraAdaptorPageView from "./LoraAdaptorPageView";

export type DashboardProps = {
    searchParams: {
        character: "Chatbot" | "LoraAdaptor" | undefined;
    };
};

async function Dashboard({ searchParams }: DashboardProps) {
    let characterData: CharacterInfoType[] = [];
    let tags: Tag[] = [];

    let loras: TLoraInfo[] = [];

    const currentView = searchParams.character || "Chatbot";

    if (currentView === "Chatbot") {
        const publicCharacterResponse = await getPublicCharacterInfoAction();

        if (publicCharacterResponse) {
            if (publicCharacterResponse.hasError) {
                console.log("character data has error");
                return (
                    <div className="flex flex-1 flex-col justify-center items-center">
                        <h1>{publicCharacterResponse.errorMsg[0]}</h1>
                        {publicCharacterResponse.errorMsg
                            ?.slice(1)
                            .map((val: string) => {
                                return <p key={val}>{val}</p>;
                            })}
                    </div>
                );
            }
            if (Array.isArray(publicCharacterResponse.characters)) {
                characterData = publicCharacterResponse.characters!;
            }
        }

        let rooms: TRoomInfo[] = [];

        // const roomData = await getRoomInfoAction();
        // if (!roomData.hasError) {
        //     rooms = roomData.rooms;
        // }

        const tagData = await getPublicTagInfoListAction();

        if (!tagData) {
            return;
        }

        if ("hasError" in tagData && tagData.hasError) {
            return (
                <>
                    <h1>{tagData.errorMsg[0]}</h1>
                    {tagData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (!("hasError" in tagData) && Array.isArray(tagData.tags)) {
            tags = tagData.tags!;
        }
    }

    if (currentView === "LoraAdaptor") {
        const loraAdapatorPublicData = await getLoraPublicInfoAction();
        if (!loraAdapatorPublicData) {
            return;
        }

        if (
            "hasError" in loraAdapatorPublicData &&
            loraAdapatorPublicData.hasError
        ) {
            return (
                <>
                    <h1>{loraAdapatorPublicData.errorMsg[0]}</h1>
                    {loraAdapatorPublicData.errorMsg
                        ?.slice(1)
                        .map((val: string) => {
                            return <p key={val}>{val}</p>;
                        })}
                </>
            );
        }

        if (
            !("hasError" in loraAdapatorPublicData) &&
            Array.isArray(loraAdapatorPublicData.data)
        ) {
            const formattedLoraAdapatorPublicData: TLoraInfo[] =
                loraAdapatorPublicData.data.map((item) => {
                    return {
                        id: item.lora_model_info.id,
                        created_date: item.lora_model_info.created_date,
                        modified_date: item.lora_model_info.modified_date,
                        lora_model_name: item.lora_model_info.lora_model_name,
                        lora_short_bio: item.lora_model_info.lora_short_bio,
                        dataset: "",
                        num_train_epochs: item.lora_model_info.num_train_epochs,
                        per_device_train_batch_size:
                            item.lora_model_info.per_device_train_batch_size,
                        learning_rate: item.lora_model_info.learning_rate,
                        warmup_steps: item.lora_model_info.warmup_steps,
                        optimizer: item.lora_model_info.optimizer,
                        lr_scheduler_type:
                            item.lora_model_info.lr_scheduler_type,
                        gradient_accumulation_steps:
                            item.lora_model_info.gradient_accumulation_steps,
                        lora_alpha: item.lora_model_info.lora_alpha,
                        lora_dropout: item.lora_model_info.lora_dropout,
                        lora_r: item.lora_model_info.lora_r,
                        lora_bias: item.lora_model_info.lora_bias,
                        current_status: [
                            {
                                id: 999999,
                                lora_model_info: item.lora_model_info.id,
                                current_status: item.current_status,
                                lora_training_error: item.lora_training_error,
                            },
                        ],
                        base_model_id: {
                            id: item.lora_model_info.base_model_id,
                            model_name: "unknown-model-name",
                            short_bio: "unknown-short-bio",
                        },
                        user: {
                            id: item.user.id,
                            full_name: item.user.full_name,
                            username: item.user.username,
                            profile_image: item.user.profile_image,
                        },
                    };
                });
            loras = [...loras, ...formattedLoraAdapatorPublicData];
        }
    }

    return (
        <main className="relative flex flex-1 flex-col pl-10 py-10 gap-10">
            <DisplaySwitcher
                active={currentView}
                chatbotHref="/"
                loraHref="/?character=LoraAdaptor"
            />

            {currentView === "Chatbot" && (
                <ChatbotPageView
                    characterData={characterData}
                    rooms={[]}
                    tags={tags}
                />
            )}

            {currentView === "LoraAdaptor" && (
                <LoraAdaptorPageView loraData={loras} />
            )}
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
