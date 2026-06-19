import { Pencil, Trash2 } from "lucide-react";

import { Button } from "../ui";
import type { CategoryEntity } from "../../../domain/category/entities";

interface CategoryItemProps {
  category: CategoryEntity;
  onEdit: (category: CategoryEntity) => void;
  onDelete: (category: CategoryEntity) => void;
}

export const CategoryItem = ({
  category,
  onEdit,
  onDelete,
}: CategoryItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary-300">
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-text">
          {category.name.toString()}
        </span>
        {category.description && (
          <span className="text-sm text-text-muted">
            {category.description}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Editar"
          onClick={() => onEdit(category)}
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Excluir"
          onClick={() => onDelete(category)}
          className="text-danger hover:bg-danger/10"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
