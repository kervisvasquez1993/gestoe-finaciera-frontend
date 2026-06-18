import { useMemo } from "react";
import { useCategoriesSummaryQuery } from "../../../aplication/services/query/category/use-categories-summary.query";

export const useCategoriesSummary = () => {
  const { data, isLoading, isError, error } = useCategoriesSummaryQuery();

  const summaries = useMemo(() => data ?? [], [data]);

  return {
    summaries,
    isLoading,
    isError,
    errorMessage: error?.message,
    isEmpty: !isLoading && summaries.length === 0,
  };
};
