import { useMemo } from "react";
import { useCategoriesQuery } from "../../../aplication/services/query/category/use-categories.query";

export const useCategories = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useCategoriesQuery();

  const categories = useMemo(() => data ?? [], [data]);

  return {
    categories,
    isLoading,
    isError,
    errorMessage: error?.message,
    refetch,
    isRefetching,
    isEmpty: !isLoading && categories.length === 0,
  };
};
