import { useRouter } from "next/router";
import { BaseSyntheticEvent, useEffect, useMemo } from "react";
import { useMutationChangePassword } from "./auth";
import {
  FieldValues,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";

export interface DynamicChangePasswordFormField {
  [key: string]: string;
  name: string;
  id: string;
}

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
  methods: UseFormReturn<FieldValues, any, undefined>;
  fields: Record<"id", string>[];
  labelDict: { [key in keyof typeof labelDict]: string };
  placeholderDict: {
    [key in keyof typeof placeholderDict]: string;
  };
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

  const methods = useForm({});

  const { control, handleSubmit } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "requiredAttributesFields",
  });

  useEffect(() => {
    if (requiredAttributes.length > 0) {
      requiredAttributes
        .map((attr) => attr.replace("userAttributes.", ""))
        .forEach((attr) => {
          const key = toCamelCase(attr);

          if (
            fields.find(
              (item) => (item as DynamicChangePasswordFormField)?.[key] === ""
            )
          )
            return;

          append({ [key]: "", name: key });
        });
    }
  }, [requiredAttributes, append, fields]);

  const onSubmit = handleSubmit((data) => {
    const args = {
      username,
      newPassword: data.newPassword,
      userAttributes: fields.reduce((acc, item) => {
        const itemField = item as DynamicChangePasswordFormField;
        return {
          ...acc,
          [itemField.name]: itemField[itemField.name],
        };
      }, {}),
    };

    changePassword.mutate(args, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  });

  return { onSubmit, methods, fields, labelDict, placeholderDict };
};

export default useChangePassword;
