import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";

export const FilterClear = () => {
  const resetFilters = useTransactionFiltersStore(
    (state) => state.resetFilters,
  );
  const filters = useTransactionFiltersStore((state) => state.filters);

  const hasActiveFilters = Boolean(
    filters.type || filters.categoryId || filters.startDate || filters.endDate,
  );

  if (!hasActiveFilters) return null;

  return (
    <button
      onClick={resetFilters}
      className="text-sm font-medium text-primary-600 hover:underline"
    >
      Limpiar filtros
    </button>
  );
};
