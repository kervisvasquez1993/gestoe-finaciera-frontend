import { useQuery } from "@tanstack/react-query";
import type { IDashboardQuery } from "../../../../domain/dashboard/dto";
import { dashboardUseCases } from "../../../use-cases/dashboard";

export const useDashboardQuery = (query?: IDashboardQuery) => {
  return useQuery({
    queryKey: ["dashboard", query],
    queryFn: () => dashboardUseCases.getSummary(query),
  });
};
