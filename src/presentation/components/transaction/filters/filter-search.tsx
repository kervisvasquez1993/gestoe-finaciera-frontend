import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";
import { Input } from "../../ui";

export const FilterSearch = () => {
  const search = useTransactionFiltersStore((state) => state.filters.search);
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);

  // estado local para escribir fluido; sincroniza al store con debounce
  const [value, setValue] = useState(search ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter("search", value.trim() || undefined);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value, setFilter]);

  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <Input
        type="text"
        placeholder="Buscar por descripción..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};
