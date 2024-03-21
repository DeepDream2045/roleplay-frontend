import React from "react";
import { TInputOption } from "@/components/atoms/Input/InputType";
import AdaptorCharacterForm from "./AdaptorCharacterForm";

type Props = {
    formattedModel: TInputOption[];
};

const CreateLoraCharacter = (props: Props) => {
    return (
        <>
            <header className="sticky top-0 flex flex-col flex-1 bg-neutral-50 py-2 items-center z-10">
                <div className="max-w-screen-md w-full ">
                    <h4>New Adaptor</h4>
                    <h5 className="font-normal">Draft</h5>
                </div>
            </header>
            <main className="flex flex-1 max-w-full flex-col items-center">
                <AdaptorCharacterForm models={props.formattedModel} />
            </main>
        </>
    );
};

export default CreateLoraCharacter;
