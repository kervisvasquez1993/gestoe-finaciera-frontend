import type { CategoryEntity } from "../../../domain/category/entities";
import { useDeleteCategory } from "../../hooks/category/use-delete-category.hook";
import { Alert, Button, Modal } from "../ui";

interface DeleteCategoryModalProps {
  category: CategoryEntity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteCategoryModal = ({
  category,
  open,
  onOpenChange,
}: DeleteCategoryModalProps) => {
  const { remove, isDeleting, deleteError } = useDeleteCategory({
    onDeleted: () => onOpenChange(false),
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        title="Excluir categoria"
        description={
          category
            ? `Tem certeza de que deseja excluir "${category.name.toString()}"?`
            : undefined
        }
      >
        <div className="flex flex-col gap-4">
          {deleteError && <Alert message={deleteError} />}

          <div className="flex justify-end gap-2">
            <Modal.Close asChild>
              <Button variant="outline" size="sm" type="button">
                Cancelar
              </Button>
            </Modal.Close>
            <Button
              variant="danger"
              size="sm"
              isLoading={isDeleting}
              onClick={() => category && remove(category.id)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
