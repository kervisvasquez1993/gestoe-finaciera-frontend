import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Alert, Button, Modal } from "../ui";
import { useDeleteTransaction } from "../../hooks/transaction/use-delete-transaction.hook";

interface DeleteTransactionButtonProps {
  id: string;
}

export const DeleteTransactionButton = ({
  id,
}: DeleteTransactionButtonProps) => {
  const [open, setOpen] = useState(false);
  const { remove, isDeleting, deleteError } = useDeleteTransaction(id);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Eliminar"
        onClick={() => setOpen(true)}
        className="text-danger hover:bg-danger/10"
      >
        <Trash2 size={16} />
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content
          title="Eliminar transacción"
          description="Esta acción no se puede deshacer."
        >
          <div className="flex flex-col gap-4">
            {deleteError && <Alert message={deleteError} />}

            <div className="flex justify-end gap-2">
              <Modal.Close asChild>
                <Button variant="outline" size="sm">
                  Cancelar
                </Button>
              </Modal.Close>
              <Button
                variant="danger"
                size="sm"
                onClick={remove}
                isLoading={isDeleting}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
