// import { apiClient } from "@/lib/api-client";

export interface GetAPIKeysAPIResponse {
  message: string;
  data: APIKey[];
  nextCursor: object;
}

export interface APIKey {
  apiKey: string;
  expiresIn?: string | number;
  idWithinDatabase: string,
}

export const fetchAPIKeys = async (): Promise<GetAPIKeysAPIResponse> => {
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
