import axios from "axios";

export interface LoginAPIProps {
  username: string;
  password: string;
}

export interface LoginAPIResponse {
  message: string;
  otherAttributes: OtherAttributes;
  requiredAttributes?: string[];
  result: string;
}

export interface OtherAttributes {
  username: string;
}

export interface SignupAPIProps {
  username: string;
  password: string;
  email: string;
  givenName: string;
  familyName: string;
  address: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_APP_URL,
});

export const fetchLogin = async (
  props: LoginAPIProps
): Promise<LoginAPIResponse> => {
  const { data } = await api.post("/login", props, {
    withCredentials: true,
  });

  return data;
};

export const fetchSignup = async (props: SignupAPIProps): Promise<any> => {
  const { data } = await api.post("/signup", props);
  return data;
};
