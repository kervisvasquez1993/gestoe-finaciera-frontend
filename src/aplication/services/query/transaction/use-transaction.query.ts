import { useQuery } from "@tanstack/react-query";
import { transactionUseCases } from "../../../use-cases/transaction";

export const useTransactionQuery = (id: string) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => transactionUseCases.getById(id),
    enabled: !!id,
  });
};
