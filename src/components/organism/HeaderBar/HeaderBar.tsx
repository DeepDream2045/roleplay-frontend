import Image from "next/image";
import React from "react";

type Props = {};

const HeaderBar = (props: Props) => {
    return (
        <div className="flex min-h-18 h-18 flex-row w-full justify-end bg-white-0 px-10 items-center">
            <div className="flex flex-row gap-10 items-center">
                <div className="bg-white-100 py-2 px-5 text-black-500 rounded-lg">
                    <h6 className="font-bold">{0} COM</h6>
                </div>
                <div className="bg-white-100 py-2 px-5 rounded-lg text-black-500">
                    <h6 className="font-bold">{"Guest"}</h6>
                </div>
                <div className="relative w-12.5 h-12.5 rounded-lg">
                    <Image
                        src={"/images/default-image-placeholder.webp"}
                        alt="Guest Profile Picture"
                        fill
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
