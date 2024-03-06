import { chunkArray } from "@/util/arrayUtil";
import React from "react";

export type TLoraAdaptorInformationItem = {
    label: string;
    value: string | number | React.ReactNode;
};
type TLoraAdaptorInformationItemProps = {
    informations: TLoraAdaptorInformationItem[];
};

const LoraAdaptorInformationItem = (
    props: TLoraAdaptorInformationItemProps
) => {
    const rows = chunkArray<TLoraAdaptorInformationItem>(props.informations, 2);

    return (
        <div className="flex flex-col gap-2">
            {rows.map((row, index) => (
                <div
                    key={`${index}`}
                    className="flex flex-row gap-4 items-center justify-between"
                >
                    {row.map((item) => (
                        <div
                            className="flex flex-col flex-1 gap-2 justify-start items-start"
                            key={item.label}
                        >
                            <h6 className="text-xl leading-7 line-clamp-1 font-bold">
                                {item.label}
                            </h6>
                            <p className="text-sm leading-5 line-clamp-1">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LoraAdaptorInformationItem;
