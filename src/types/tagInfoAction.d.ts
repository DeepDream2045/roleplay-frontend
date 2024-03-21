export type Tag = {
    id: TagId;
    tag_name: string;
};

export type TGetPublicTagInfoListActionResponse = Tag[];

export type TGetPublicTagInfoListActionReturn =
    | TGetPublicTagInfoListActionResponse
    | {
          hasError: true;
          errorMsg: any[];
      }
    | undefined;
