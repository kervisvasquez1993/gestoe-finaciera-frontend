import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateTransactionRequest } from "../../../../domain/transaction/dto";
import { transactionUseCases } from "../../../use-cases/transaction";

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTransactionRequest) =>
      transactionUseCases.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
