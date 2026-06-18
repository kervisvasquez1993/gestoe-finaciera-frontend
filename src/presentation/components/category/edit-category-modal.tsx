import type { CategoryEntity } from "../../../domain/category/entities";
import { useEditCategoryModal } from "../../hooks/category/use-edit-category-modal.hook";
import { Button, Form, Modal } from "../ui";

interface EditCategoryModalProps {
  category: CategoryEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditCategoryModal = ({
  category,
  open,
  onOpenChange,
}: EditCategoryModalProps) => {
  const { control, errors, isPending, serverError, handleSubmit } =
    useEditCategoryModal({
      category,
      onUpdated: () => onOpenChange(false),
    });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        title="Editar categoría"
        description="Modificá los datos de la categoría"
      >
        <Form control={control} errors={errors} onSubmit={handleSubmit}>
          <Form.Error message={serverError} />

          <Form.Field name="name" label="Nombre" placeholder="Ej: Comida" />
          <Form.Field
            name="description"
            label="Descripción (opcional)"
            placeholder="Una breve descripción"
          />

          <div className="flex justify-end gap-2">
            <Modal.Close asChild>
              <Button variant="outline" size="sm" type="button">
                Cancelar
              </Button>
            </Modal.Close>
            <Button type="submit" size="sm" isLoading={isPending}>
              Guardar cambios
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
