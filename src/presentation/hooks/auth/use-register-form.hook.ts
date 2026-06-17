import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormInput } from "../../schemas/auth";
import { useRegisterMutation } from "../../../aplication/services/mutation/auth/use-register.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

export const useRegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const { mutate, isPending } = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    setServerError(null);
    setSuccessMessage(null);
    mutate(data, {
      onSuccess: () => {
        setSuccessMessage("Usuario creado exitosamente");
        reset();
      },
      onError: (error) => setServerError(getErrorMessage(error)),
    });
  };

  return {
    control,
    errors,
    isPending,
    serverError,
    successMessage,
    handleSubmit: handleSubmit(onSubmit),
  };
};
