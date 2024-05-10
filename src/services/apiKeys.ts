import { apiClient } from "@/lib/api-client";

export interface GetAPIKeysAPIResponse {
  message: string;
  data: APIKey[];
  nextCursor: object;
}

export interface CreateAPIKeyAPIProps {
  expiresInWeeks: number;
}

export interface APIKey {
  apiKey: string;
  expiresIn?: string | number;
  idWithinDatabase: string,
}

export const getAPIKeys = async (): Promise<GetAPIKeysAPIResponse> => {
  // const { data } = await apiClient.get("/api-management/list");
  // console.log(data)
  const data = {
    nextCursor: {},
    message: "ALL YOUR BASE ARE BELONG TO US",
    data: [
      {
        apiKey: "12345678**************87654321",
        expiresIn: "some day soon, be prepared",
        idWithinDatabase: "key1Id"
      },
      {
        apiKey: "22345678**************87654322",
        expiresIn: "MEMENTO MORI",
        idWithinDatabase: "key2Id"
      },
    ]
  };

  return data;
};

export const postCreateAPIKey = async (
  props: CreateAPIKeyAPIProps
): Promise<any> => {
  const { data } = await apiClient.post("/api-management/add", props);
  return data;
};
