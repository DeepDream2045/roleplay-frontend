import React from "react";
import { TInputOption } from "@/components/atoms/Input/InputType";
import AdaptorCharacterForm from "./AdaptorCharacterForm";

type Props = {
    formattedModel: TInputOption[];
};

const CreateLoraCharacter = (props: Props) => {
    return (
        <div className="flex flex-1 flex-col py-10">
            <header className="sticky top-0 flex flex-col flex-1 w-full text-black-900 dark:text-white-200 bg-white-100 dark:bg-black-500  items-center z-10">
                <div className="w-full flex flex-row gap-2">
                    <h4 className={`text-5 leading-normal font-bold `}>
                        New Lora
                    </h4>
                    <h5 className="text-5 leading-normal font-normal ">
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
