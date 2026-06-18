import { useMemo } from "react";
import { useTransactionFiltersStore } from "../../stores/transaction-filters.store";
import { useTransactionsQuery } from "../../../aplication/services/query/transaction/use-transactions.query";

export const useTransactions = () => {
  const filters = useTransactionFiltersStore((state) => state.filters);

  const { data, isLoading, isError, error, isFetching } =
    useTransactionsQuery(filters);

  const transactions = useMemo(() => data?.data ?? [], [data]);

  return {
    transactions,
    meta: data?.meta,
    isLoading,
    isError,
    errorMessage: error?.message,
    isFetching,
    isEmpty: !isLoading && transactions.length === 0,
  };
};
