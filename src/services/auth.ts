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

export const fetchLogin = async (
  props: LoginAPIProps
): Promise<LoginAPIResponse> => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_APP_URL + "/login",
    props,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return data;
};

export interface SignupAPIProps {
  username: string;
  password: string;
  email: string;
  givenName: string;
  familyName: string;
  address: string;
}

export const fetchSignup = async (props: SignupAPIProps) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_APP_URL + "/signup",
    props,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
