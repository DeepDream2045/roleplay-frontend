import React from "react";

type TCharacterPageProps = {
    params: { character_id: string };
};

const CharacterPage = ({ params: { character_id } }: TCharacterPageProps) => {
    return <div>CharacterPage: {character_id}</div>;
};

export default CharacterPage;
