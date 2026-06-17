import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormInput } from "../../schemas/auth";
import { useLoginMutation } from "../../../aplication/services/mutation/auth/use-login.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

export const useLoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    setServerError(null);
    mutate(data, {
      onError: (error) => setServerError(getErrorMessage(error)),
    });
  };

  return {
    control,
    errors,
    isPending,
    serverError,
    handleSubmit: handleSubmit(onSubmit),
  };
};
