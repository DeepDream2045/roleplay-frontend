import React from "react";
import { TInputOption } from "@/components/atoms/Input/InputType";
import AdaptorCharacterForm from "./AdaptorCharacterForm";

type Props = {
    formattedModel: TInputOption[];
};

const CreateLoraCharacter = (props: Props) => {
    return (
        <div className="flex flex-1 flex-col py-10">
            <header className="sticky top-0 flex flex-col flex-1 w-full bg-white-100 items-center z-10">
                <div className="w-full flex flex-row gap-2">
                    <h4
                        className={`text-5 leading-normal font-bold text-black-500`}
                    >
                        New Lora
                    </h4>
                    <h5 className="text-5 leading-normal font-normal text-black-500">
                        (Draft)
                    </h5>
                </div>
            </header>
            <main className="flex flex-1 flex-col">
                <AdaptorCharacterForm models={props.formattedModel} />
            </main>
        </div>
    );
};

export default CreateLoraCharacter;
