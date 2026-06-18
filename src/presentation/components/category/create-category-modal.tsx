import { useCreateCategoryModal } from "../../hooks/category/use-create-category-modal.hook";
import { Button, Form, Modal } from "../ui";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCategoryModal = ({
  open,
  onOpenChange,
}: CreateCategoryModalProps) => {
  const { control, errors, isPending, serverError, handleSubmit } =
    useCreateCategoryModal({
      onCreated: () => onOpenChange(false), // cierra al crear
    });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        title="Nueva categoría"
        description="Creá una categoría para clasificar tus transacciones"
      >
        <Form control={control} errors={errors} onSubmit={handleSubmit}>
          <Form.Error message={serverError} />

          <Form.Field name="name" label="Nombre" placeholder="Ej: Comida" />
          <Form.Field
            name="description"
            label="Descripción (opcional)"
            placeholder="Una breve descripción"
          />

          <Button type="submit" isLoading={isPending}>
            Crear categoría
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
