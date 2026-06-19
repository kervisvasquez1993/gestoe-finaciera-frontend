import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTransactionFiltersStore } from "../../../stores/transaction-filters.store";
import { Input } from "../../ui";

export const FilterSearch = () => {
  const search = useTransactionFiltersStore((state) => state.filters.search);
  const setFilter = useTransactionFiltersStore((state) => state.setFilter);

  const [value, setValue] = useState(search ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter("search", value.trim() || undefined);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value, setFilter]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <Input
        type="text"
        placeholder="Buscar por descrição..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-full border-border bg-background pl-9"
      />
    </div>
  );
};
