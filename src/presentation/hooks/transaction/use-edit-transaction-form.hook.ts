import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useTransactionQuery } from "../../../aplication/services/query/transaction/use-transaction.query";
import {
  createTransactionSchema,
  type CreateTransactionFormInput,
} from "../../schemas/transaction";
import { useUpdateTransactionMutation } from "../../../aplication/services/mutation/transaction/use-update-transaction.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

export const useEditTransactionForm = (id: string) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: transaction, isLoading, isError } = useTransactionQuery(id);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
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

  // precarga el form cuando llega la transacción
  useEffect(() => {
    if (transaction) {
      reset({
        description: transaction.description,
        amount: transaction.amount.toNumber(),
        type: transaction.type.toString(),
        date: transaction.date,
        categoryId: transaction.categoryId,
      });
    }
  }, [transaction, reset]);

  const { mutate, isPending } = useUpdateTransactionMutation();

  const onSubmit: SubmitHandler<CreateTransactionFormInput> = (data) => {
    setServerError(null);
    mutate(
      { id, data },
      {
        onSuccess: () => navigate("/dashboard/transactions"),
        onError: (error) => setServerError(getErrorMessage(error)),
      },
    );
  };

  return {
    control,
    errors,
    setValue,
    isPending,
    serverError,
    isLoading,
    isError,
    notFound: !isLoading && !isError && !transaction,
    handleSubmit: handleSubmit(onSubmit),
  };
};
