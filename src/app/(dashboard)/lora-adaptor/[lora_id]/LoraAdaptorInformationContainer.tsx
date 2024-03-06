import React, { ReactNode } from "react";

type TLoraAdaptorInformationContainerProps = {
    children: ReactNode;
};

const LoraAdaptorInformationContainer = (
    props: TLoraAdaptorInformationContainerProps
) => {
    return <div className="flex flex-col gap-4 w-full">{props.children}</div>;
};

export default LoraAdaptorInformationContainer;
