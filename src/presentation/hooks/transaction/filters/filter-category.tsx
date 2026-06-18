import { Select } from "../../../components/ui";
import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";
import { useCategories } from "../../category/use-categories.hook";

export const FilterCategory = () => {
  const { categories } = useCategories();
  const categoryId = useTransactionFiltersStore(
    (state) => state.filters.categoryId,
  );
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);

  const options = categories.map((c) => ({
    value: c.id,
    label: c.name.toString(),
  }));

  return (
    <Select
      options={options}
      placeholder="Todas las categorías"
      value={categoryId ?? ""}
      onChange={(e) => setFilter("categoryId", e.target.value || undefined)}
    />
  );
};
