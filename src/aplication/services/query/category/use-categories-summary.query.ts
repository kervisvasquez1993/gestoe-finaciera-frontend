import { useQuery } from "@tanstack/react-query";
import { categoryUseCases } from "../../../use-cases/category";

export const useCategoriesSummaryQuery = () => {
  return useQuery({
    queryKey: ["categories", "summary"],
    queryFn: () => categoryUseCases.getSummary(),
  });
};
