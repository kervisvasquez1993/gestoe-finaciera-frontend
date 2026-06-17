import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpdateCategoryRequest } from "../../../../domain/category/dto";
import { categoryUseCases } from "../../../use-cases/category";

interface UpdateCategoryVars {
  id: string;
  data: IUpdateCategoryRequest;
}

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVars) =>
      categoryUseCases.update(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", id] });
    },
  });
};
