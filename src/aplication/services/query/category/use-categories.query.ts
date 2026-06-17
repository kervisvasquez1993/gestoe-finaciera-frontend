import { useQuery } from "@tanstack/react-query";
import { categoryUseCases } from "../../../use-cases/category";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryUseCases.getAll(),
  });
};
