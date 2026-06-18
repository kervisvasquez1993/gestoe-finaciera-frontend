import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteTransactionMutation } from "../../../aplication/services/mutation/transaction/use-delete-transaction.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

export const useDeleteTransaction = (id: string) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useDeleteTransactionMutation();

  const remove = () => {
    setError(null);
    mutate(id, {
      onSuccess: () => navigate("/dashboard/transactions"),
      onError: (err) => setError(getErrorMessage(err)),
    });
  };

  return { remove, isDeleting: isPending, deleteError: error };
};
