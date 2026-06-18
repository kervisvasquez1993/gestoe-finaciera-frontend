import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDashboardQuery } from "../../../aplication/services/query/dashboard/use-dashboard.query";

export const useDashboard = () => {
  const [searchParams] = useSearchParams();

  const query = useMemo(() => {
    const startDate = searchParams.get("startDate") ?? undefined;
    const endDate = searchParams.get("endDate") ?? undefined;
    return { startDate, endDate };
  }, [searchParams]);

  const { data, isLoading, isError, error } = useDashboardQuery(query);

  return {
    summary: data,
    isLoading,
    isError,
    errorMessage: error?.message,
  };
};
