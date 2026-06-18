import { Select } from "../../../components/ui";
import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";

const TYPE_OPTIONS = [
  { value: "entrada", label: "Entrada" },
  { value: "saida", label: "Salida" },
];

export const FilterType = () => {
  const type = useTransactionFiltersStore((state) => state.filters.type);
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);

  return (
    <Select
      options={TYPE_OPTIONS}
      placeholder="Todos los tipos"
      value={type ?? ""}
      onChange={(e) =>
        setFilter(
          "type",
          e.target.value ? (e.target.value as "entrada" | "saida") : undefined,
        )
      }
    />
  );
};
