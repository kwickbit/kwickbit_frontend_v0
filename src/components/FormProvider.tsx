import { UseFormReturn, FormProvider as Form } from "react-hook-form";
import React from "react";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  className,
}: Props): JSX.Element {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}
