import { useQuery } from "@tanstack/react-query";
import { categoryUseCases } from "../../../use-cases/category";

export const useCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryUseCases.getById(id),
    enabled: !!id,
  });
};
