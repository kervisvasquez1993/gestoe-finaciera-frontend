import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { IFilterTransactionsRequest } from "../../../../domain/transaction/dto";
import { transactionUseCases } from "../../../use-cases/transaction";

export const useTransactionsQuery = (filters?: IFilterTransactionsRequest) => {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => transactionUseCases.getAll(filters),
    placeholderData: keepPreviousData,
  });
};
