/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const ModalRoot = ({ open, onOpenChange, children }: ModalRootProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

interface ModalContentProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const ModalContent = ({ title, description, children }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-lg focus:outline-none">
        <div className="mb-4 flex flex-col gap-1">
          <Dialog.Title className="text-lg font-bold text-text">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-text-muted">
              {description}
            </Dialog.Description>
          )}
        </div>
        {children}
        <Dialog.Close
          aria-label="Cerrar"
          className="absolute right-4 top-4 text-text-muted transition-colors hover:text-text"
        >
          ✕
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Trigger: Dialog.Trigger,
  Content: ModalContent,
  Close: Dialog.Close,
});
