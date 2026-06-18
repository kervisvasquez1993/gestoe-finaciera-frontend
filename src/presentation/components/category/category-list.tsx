import type { CategoryEntity } from "../../../domain/category/entities";
import { CategoryItem } from "./category-item";

interface CategoryListProps {
  categories: CategoryEntity[];
  onEdit: (category: CategoryEntity) => void;
  onDelete: (category: CategoryEntity) => void;
}

export const CategoryList = ({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
