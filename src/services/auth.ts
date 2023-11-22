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

export interface ConfirmCodeAPIProps {
  username: string;
  confirmationCode: string;
}

export interface ConfirmCodeAPIResponse {
  message: string;
  result: string;
  errorCode: string;
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

export const fetchConfirmCode = async (
  props: ConfirmCodeAPIProps
): Promise<ConfirmCodeAPIResponse> => {
  const { data } = await api.post("/confirm-code", props, {
    withCredentials: false,
  });

  return data;
};

export const fetchResendCode = async (props: {
  username: string;
}): Promise<any> => {
  const { data } = await api.post("/resend-code", props, {
    withCredentials: false,
  });

  return data;
};

interface ChangePasswordAPIProps {
  username: string;
  newPassword: string;
  userAttributes: { [key: string]: string };
}

export const fetchChangePassword = async (
  props: ChangePasswordAPIProps
): Promise<any> => {
  const { data } = await api.post("/change-password", props, {
    withCredentials: true,
  });

  return data;
};
