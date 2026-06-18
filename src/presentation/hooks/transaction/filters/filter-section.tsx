import { FilterType } from "./filter-type";
import { FilterCategory } from "./filter-category";
import { FilterDateRange } from "./filter-date-range";
import { FilterClear } from "./filter-clear";

export const FilterSection = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4">
      <FilterType />
      <FilterCategory />
      <FilterDateRange />
      <FilterClear />
    </div>
  );
};
