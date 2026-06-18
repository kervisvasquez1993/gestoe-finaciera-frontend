import type { CategoryEntity } from "../../../domain/category/entities";

interface CategoryItemProps {
  category: CategoryEntity;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-4">
      <span className="font-semibold text-text">
        {category.name.toString()}
      </span>
      {category.description && (
        <span className="text-sm text-text-muted">{category.description}</span>
      )}
    </div>
  );
};
