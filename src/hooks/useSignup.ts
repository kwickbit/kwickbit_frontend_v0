import { BaseSyntheticEvent } from "react";
import { SignupAPIProps } from "@/services/auth";
import { toast } from "react-toastify";
import { UseFormReturn, useForm } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { useMutationSignup } from "./auth";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  username: "",
  password: "",
  email: "",
  givenName: "",
  familyName: "",
  address: "",
};

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email().min(1, "Email is required"),
  givenName: z.string().min(1, "Given Name is required"),
  familyName: z.string().min(1, "Family Name is required"),
  address: z.string().min(1, "Address is required"),
});

interface ReturnProps {
  methods: UseFormReturn<
    {
      username: string;
      password: string;
      email: string;
      givenName: string;
      familyName: string;
      address: string;
    },
    any,
    undefined
  >;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  signup: UseMutationResult<any, Error, SignupAPIProps, unknown>;
}

const useSignup = (): ReturnProps => {
  const signup = useMutationSignup();

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    window.grecaptcha.ready(async () => {
      const tokenRecaptchaResponse = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_GOOGLE_RE_CAPTCHA_V3_PUBLIC_KEY as string, {action: 'SIGNUP'});
      // Append the reCAPTCHA token to your form data
      const enhancedData = {...data, tokenRecaptchaResponse};

      signup.mutate(enhancedData, {
        onSuccess: () => {
          router.push("/signup/success");
        },
        onError: () => {
          //API Should return a error message
          toast.error("Something went wrong, please try again.");
        },
      });
    });
  });

  return { methods, onSubmit, signup };
};

export default useSignup;
