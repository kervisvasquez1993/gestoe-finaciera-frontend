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
      onCreated: () => onOpenChange(false),
    });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        title="Nova categoria"
        description="Crie uma categoria para classificar suas transações"
      >
        <Form control={control} errors={errors} onSubmit={handleSubmit}>
          <Form.Error message={serverError} />

          <Form.Field name="name" label="Nome" placeholder="Ex: Comida" />
          <Form.Field
            name="description"
            label="Descrição (opcional)"
            placeholder="Uma breve descrição"
          />

          <Button type="submit" isLoading={isPending}>
            Criar categoria
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
