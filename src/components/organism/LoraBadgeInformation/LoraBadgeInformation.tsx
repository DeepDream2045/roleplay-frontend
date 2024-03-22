import React from "react";

type LoraBadgeInformationProps = {
    label: string;
    value: string | number;
};

const LoraBadgeInformation = ({ label, value }: LoraBadgeInformationProps) => {
    return (
        <div className="flex flex-col gap-1 flex-1 p-3 rounded-md border border-black-200 text-black-900 dark:text-white-200">
            <p className="text-sm leading-none  font-normal">{label}</p>
            <p className="text-sm leading-none  font-normal">{value}</p>
        </div>
    );
};

export default LoraBadgeInformation;
