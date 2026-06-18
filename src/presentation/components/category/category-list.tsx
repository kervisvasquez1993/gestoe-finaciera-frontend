import type { CategoryEntity } from "../../../domain/category/entities";
import { CategoryItem } from "./category-item";

interface CategoryListProps {
  categories: CategoryEntity[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
