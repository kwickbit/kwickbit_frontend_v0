import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutationChangePassword } from "./auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const toCamelCase = (str: string): string => {
  return str
    .split("_")
    .map((word, index) => {
      // If it's the first word, return it as is. Otherwise, capitalize the first letter.
      return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
    })
    .join("");
};

interface ReturnProps {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  methods: UseFormReturn<
    {
      newPassword: string;
      email: string;
      givenName: string;
      familyName: string;
      preferredUsername: string;
      address: string;
    },
    any,
    undefined
  >;
  labelDict: { [key in keyof typeof labelDict]: string };
  placeholderDict: {
    [key in keyof typeof placeholderDict]: string;
  };
  addedKeys: string[];
}

const labelDict = {
  email: "Email",
  givenName: "First Name",
  familyName: "Family Name",
  preferredUsername: "Preferred Username",
  address: "Address",
};

const placeholderDict = {
  email: "Enter your email",
  givenName: "Enter your first name",
  familyName: "Enter your family name",
  preferredUsername: "Enter your preferred username",
  address: "Enter your address",
};

const useChangePassword = (): ReturnProps => {
  const router = useRouter();

  const requiredAttributes = useMemo(() => {
    return (
      (router.query.requiredAttributes as string | undefined)?.split(",") || []
    );
  }, [router.query.requiredAttributes]);

  const username = router.query.username as string;

  const changePassword = useMutationChangePassword();

  const methods = useForm({
    defaultValues: {
      newPassword: "",
      email: "",
      givenName: "",
      familyName: "",
      preferredUsername: "",
      address: "",
    },
  });

  const { handleSubmit } = methods;

  const [addedKeys, setAddedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (requiredAttributes.length > 0) {
      requiredAttributes
        .map((attr) => attr.replace("userAttributes.", ""))
        .forEach((attr) => {
          const key = toCamelCase(attr);
          if (addedKeys.includes(key)) return;
          setAddedKeys((prev) => [...prev, key]);
        });
    }
  }, [requiredAttributes, addedKeys]);

  const onSubmit = handleSubmit((data) => {
    const userAttributes: { [key: string]: string } = {};

    addedKeys.forEach((key) => {
      userAttributes[key] = data[key as keyof typeof data];
    });

    const args = {
      username,
      newPassword: data.newPassword,
      userAttributes,
    };

    changePassword.mutate(args, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong, please try again.");
      },
    });
  });

  return {
    onSubmit,
    methods,
    labelDict,
    placeholderDict,
    addedKeys,
  };
};

export default useChangePassword;
