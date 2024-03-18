import { CharacterInfoType } from "./action";

export type TGetPublicCharacterInfoActionResponse = CharacterInfoType[];

export type TGetPublicCharacterInfoActionReturn =
    | TGetPublicCharacterInfoActionResponse
    | {
          hasError: true;
          errorMsg: any;
      }
    | undefined;
