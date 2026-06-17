import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryUseCases } from "../../../use-cases/category";

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryUseCases.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
