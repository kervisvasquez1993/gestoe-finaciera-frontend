import { useState } from "react";
import { useDeleteCategoryMutation } from "../../../aplication/services/mutation/category/use-delete-category.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

interface UseDeleteCategoryArgs {
  onDeleted?: () => void;
}

export const useDeleteCategory = ({
  onDeleted,
}: UseDeleteCategoryArgs = {}) => {
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useDeleteCategoryMutation();

  const remove = (id: string) => {
    setError(null);
    mutate(id, {
      onSuccess: () => onDeleted?.(),
      onError: (err) => setError(getErrorMessage(err)),
    });
  };

  return {
    remove,
    isDeleting: isPending,
    deleteError: error,
    clearError: () => setError(null),
  };
};
