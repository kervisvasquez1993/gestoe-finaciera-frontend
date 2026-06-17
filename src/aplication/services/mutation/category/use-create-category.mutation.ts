import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateCategoryRequest } from "../../../../domain/category/dto";
import { categoryUseCases } from "../../../use-cases/category";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateCategoryRequest) => categoryUseCases.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
