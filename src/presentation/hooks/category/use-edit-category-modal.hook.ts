import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CategoryEntity } from "../../../domain/category/entities";
import {
  updateCategorySchema,
  type UpdateCategoryFormInput,
} from "../../schemas/category";
import { useUpdateCategoryMutation } from "../../../aplication/services/mutation/category/use-update-category.mutation";
import { getErrorMessage } from "../../utils/get-error-message";

interface UseEditCategoryModalArgs {
  category: CategoryEntity | null;
  onUpdated?: () => void;
}

export const useEditCategoryModal = ({
  category,
  onUpdated,
}: UseEditCategoryModalArgs) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryFormInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  // precarga cuando cambia la categoría a editar
  useEffect(() => {
    if (category) {
      reset({
        name: category.name.toString(),
        description: category.description ?? "",
      });
    }
  }, [category, reset]);

  const { mutate, isPending } = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<UpdateCategoryFormInput> = (data) => {
    if (!category) return;
    setServerError(null);
    mutate(
      { id: category.id, data },
      {
        onSuccess: () => onUpdated?.(),
        onError: (error) => setServerError(getErrorMessage(error)),
      },
    );
  };

  return {
    control,
    errors,
    isPending,
    serverError,
    handleSubmit: handleSubmit(onSubmit),
  };
};
