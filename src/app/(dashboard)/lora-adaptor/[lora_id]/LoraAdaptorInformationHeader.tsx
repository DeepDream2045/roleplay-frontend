import React, { ReactNode } from "react";

type TLoraAdaptorInformationHeaderProps = {
    children: ReactNode;
};

const LoraAdaptorInformationHeader = (
    props: TLoraAdaptorInformationHeaderProps
) => {
    return <h4 className="text-[1.75rem] font-bold">{props.children}</h4>;
};

export default LoraAdaptorInformationHeader;
