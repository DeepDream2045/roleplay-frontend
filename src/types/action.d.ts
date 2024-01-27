// Auth Session
export type RefreshSession = string | undefined;

export type AccessSession = string | undefined;

export type UserSession = {
  id?: string;
  full_name?: string;
  email?: string;
  profile_image?: string | null;
  stay_sign?: boolean;
};

export type AuthSession = {
  user?: UserSession;
  refresh?: RefreshSession;
  access?: AccessSession;
};

export type ErrorMessage = {
  title: string;
  message: string[];
};

// createCharacterAction function

export type TCreateCharacterActionState = {
  hasError: boolean;
  errorMsg: ErrorMessage | null;
};

export type TCreateCharacterActionPayload = {
  get(key: "character_name"): string;
  get(key: "short_bio"): string;
  get(key: "character_gender"): string;
  getAll(key: "tags"): string[];
  get(key: "model_id"): string;
  get(key: "prompt"): string;
  get(key: "prompt_visibility"): string;
  get(key: "initial_message"): string;
  get(key: "NSFW"): "on" | "off";
  get(key: "lorebook"): string;
  get(key: "language"): string;
};

export type CharacterInfoId = number;
export type TagId = number;
export type UserId = number;
export type ModelId = number;

export type createCharacterAPIResponseBody = {
  id: CharacterInfoId;
  character_name: string;
  short_bio: string;
  character_gender: string;
  tags: TagId[];
  prompt: string;
  character_visibility: string;
  initial_message: string;
  image: string | null;
  NSFW: boolean;
  lorebook: string;
  language: string;
  created_date: string;
  modified_date: string;
  model_id: ModelId;
  user: UserId;
};

// getCharacterInfoAction
export type Tag = {
  id: TagId;
  tag_name: string;
};

export type CharacterInfoType = {
  id: number;
  model_id: {
    id: number;
    model_name: string;
    short_bio: string;
    model_location: string;
    prompt_template: string;
    temperature: string;
    repetition_penalty: string;
    top_p: number;
    top_k: number;
  };
  user: {
    id: number;
    full_name: string;
    profile_image: string | null;
  };
  tags: Tag[];
  character_name: string;
  short_bio: string;
  character_gender: string;
  prompt: string;
  character_visibility: "unlisted" | "private" | "public";
  initial_message: string | null;
  image: string | null;
  NSFW: boolean;
  lorebook: string | null;
  language: string | null;
  created_date: string;
  modified_date: string;
};

export type TGetCharacterInfoListActionReturnOkay = {
  hasError: false;
  characters: CharacterInfoType[];
};

export type TGetCharacterInfoListActionReturnError = {
  hasError: true;
  errorMsg: any[];
};

export type TGetCharacterInfoListActionReturn =
  | TGetCharacterInfoListActionReturnOkay
  | TGetCharacterInfoListActionReturnError;

// magicLinkRequestService function

export type TMagicLinkRequestServiceState = {
  formSubmitted: boolean;
  emailSuccessSent: boolean;
};

export type TMagicLinkRequestServicePayload = {
  get(key: "email"): string;
};

// magicLinkVerifyServiceAction function
// TODO: Refactoring magicLinkVerifyServiceAction
