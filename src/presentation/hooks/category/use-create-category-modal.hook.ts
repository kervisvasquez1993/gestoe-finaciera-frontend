import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelectedCategoryStore } from "../../stores/selected-category.store";

import { useCreateCategoryMutation } from "../../../aplication/services/mutation/category/use-create-category.mutation";
import {
  createCategorySchema,
  type CreateCategoryFormInput,
} from "../../schemas/category/create-category.schema";
import { getErrorMessage } from "../../utils/get-error-message";

interface UseCreateCategoryModalArgs {
  onCreated?: () => void;
}

export const useCreateCategoryModal = ({
  onCreated,
}: UseCreateCategoryModalArgs = {}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const setLastCreatedId = useSelectedCategoryStore(
    (state) => state.setLastCreatedId,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryFormInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  const { mutate, isPending } = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<CreateCategoryFormInput> = (data) => {
    setServerError(null);
    mutate(data, {
      onSuccess: (category) => {
        setLastCreatedId(category.id);
        reset();
        onCreated?.();
      },
      onError: (error) => setServerError(getErrorMessage(error)),
    });
  };

  return {
    control,
    errors,
    isPending,
    serverError,
    handleSubmit: handleSubmit(onSubmit),
  };
};
