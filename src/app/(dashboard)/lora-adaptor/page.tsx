import LoraAdaptorCard from "@/components/organism/LoraAdaptorCard/LoraAdaptorCard";
import { getAuthSession } from "@/lib/authSession";
import { getLoraInfoAction } from "@/lib/loraInfoAction";
import { TLoraInfo } from "@/types/loraInfoAction";

export type TLoraAdaptorListPageProps = {};

export default async function LoraAdaptorListPage({}: TLoraAdaptorListPageProps) {
    const session = await getAuthSession();

    let loras: TLoraInfo[] = [];
    if (session?.access) {
        const loraAdapatorData = await getLoraInfoAction();
        if (!loraAdapatorData) {
            return;
        }

        if ("hasError" in loraAdapatorData && loraAdapatorData.hasError) {
            return (
                <>
                    <h1>{loraAdapatorData.errorMsg[0]}</h1>
                    {loraAdapatorData.errorMsg?.slice(1).map((val: string) => {
                        return <p key={val}>{val}</p>;
                    })}
                </>
            );
        }

        if (
            !("hasError" in loraAdapatorData) &&
            Array.isArray(loraAdapatorData.data)
        ) {
            loras = loraAdapatorData.data;
        }
    }
    return (
        <div className="flex flex-wrap flex-col gap-4">
            <h1>All Lora Adapator</h1>
            <div className="flex flex-wrap flex-row gap-4">
                {loras.map((lora: TLoraInfo) => {
                    return <LoraAdaptorCard key={lora.id} lora={lora} />;
                })}
            </div>
        </div>
    );
}