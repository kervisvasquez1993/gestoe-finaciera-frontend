import { Input } from "../../../components/ui";
import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";

export const FilterDateRange = () => {
  const startDate = useTransactionFiltersStore(
    (state) => state.filters.startDate,
  );
  const endDate = useTransactionFiltersStore((state) => state.filters.endDate);
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);

  return (
    <div className="flex gap-2">
      <Input
        type="date"
        value={startDate ?? ""}
        onChange={(e) => setFilter("startDate", e.target.value || undefined)}
      />
      <Input
        type="date"
        value={endDate ?? ""}
        onChange={(e) => setFilter("endDate", e.target.value || undefined)}
      />
    </div>
  );
};
