import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  createTransactionSchema,
  type CreateTransactionFormInput,
} from "../../schemas/transaction";
import { useCreateTransactionMutation } from "../../../aplication/services/mutation/transaction/use-create-transaction.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

export const useCreateTransactionForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTransactionFormInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      amount: undefined,
      type: undefined,
      date: "",
      categoryId: "",
    },
  });

  const { mutate, isPending } = useCreateTransactionMutation();

  const onSubmit: SubmitHandler<CreateTransactionFormInput> = (data) => {
    setServerError(null);
    mutate(data, {
      onSuccess: () => navigate("/dashboard/transactions"),
      onError: (error) => setServerError(getErrorMessage(error)),
    });
  };

  return {
    control,
    errors,
    setValue,
    isPending,
    serverError,
    handleSubmit: handleSubmit(onSubmit),
  };
};
