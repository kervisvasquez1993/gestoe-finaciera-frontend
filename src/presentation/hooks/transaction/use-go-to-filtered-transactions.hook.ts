import { useNavigate } from "react-router-dom";
import {
  useTransactionFiltersStore,
  type TransactionFilters,
} from "../../stores/transaction-filters.store";

export const useGoToFilteredTransactions = () => {
  const navigate = useNavigate();
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);
  const resetFilters = useTransactionFiltersStore(
    (state) => state.resetFilters,
  );

  const goWithFilters = (filters: Partial<TransactionFilters>) => {
    resetFilters(); //
    Object.entries(filters).forEach(([key, value]) => {
      setFilter(key as keyof TransactionFilters, value);
    });
    navigate("/dashboard/transactions");
  };

  return { goWithFilters };
};
