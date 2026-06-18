import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";

import { useCategories } from "../../hooks/category/use-categories.hook";
import { useSelectedCategoryStore } from "../../stores/selected-category.store";
import { Select } from "../ui";
import { CreateCategoryModal } from "../category/create-category-modal";

interface CategorySelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  error?: string;
}

export const CategorySelectField = <T extends FieldValues>({
  control,
  setValue,
  name,
  error,
}: CategorySelectFieldProps<T>) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { categories } = useCategories();

  const lastCreatedId = useSelectedCategoryStore(
    (state) => state.lastCreatedId,
  );
  const clearLastCreated = useSelectedCategoryStore((state) => state.clear);

  const options = categories.map((c) => ({
    value: c.id,
    label: c.name.toString(),
  }));

  // autoselecciona la categoría recién creada (a nivel componente, no en el render-prop)
  useEffect(() => {
    if (lastCreatedId && categories.some((c) => c.id === lastCreatedId)) {
      setValue(name, lastCreatedId as never);
      clearLastCreated();
    }
  }, [lastCreatedId, categories, name, setValue, clearLastCreated]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text">Categoría</label>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-xs font-medium text-primary-600 hover:underline"
        >
          + Nueva
        </button>
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder="Seleccioná una categoría"
            error={error}
          />
        )}
      />

      <CreateCategoryModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
