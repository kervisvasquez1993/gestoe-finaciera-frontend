import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpdateTransactionRequest } from "../../../../domain/transaction/dto";
import { transactionUseCases } from "../../../use-cases/transaction";

interface UpdateTransactionVars {
  id: string;
  data: IUpdateTransactionRequest;
}

export const useUpdateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTransactionVars) =>
      transactionUseCases.update(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
