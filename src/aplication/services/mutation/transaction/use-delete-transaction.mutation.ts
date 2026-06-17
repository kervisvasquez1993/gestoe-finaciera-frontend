import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionUseCases } from "../../../use-cases/transaction";

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionUseCases.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};
