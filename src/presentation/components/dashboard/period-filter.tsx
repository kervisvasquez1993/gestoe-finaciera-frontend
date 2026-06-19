import { useSearchParams } from "react-router-dom";

import { Input } from "../ui";

export const PeriodFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const startDate = searchParams.get("startDate") ?? "";
  const endDate = searchParams.get("endDate") ?? "";

  const update = (key: string, value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    });
  };

  const clear = () => setSearchParams({});

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-muted">De</label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-muted">Até</label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
      </div>
      {(startDate || endDate) && (
        <button
          onClick={clear}
          className="px-2 py-2 text-sm font-medium text-primary-600 hover:underline"
        >
          Todo o período
        </button>
      )}
    </div>
  );
};
