import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategories } from "../../hooks/category/use-categories.hook";
import type { CategoryEntity } from "../../../domain/category/entities";
import { Alert, Button, DataList } from "../../components/ui";
import {
  CategoryList,
  CreateCategoryModal,
  DeleteCategoryModal,
  EditCategoryModal,
} from "../../components/category";

export const CategoriesScreen = () => {
  const { categories, isLoading, isError, isEmpty, errorMessage } =
    useCategories();

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryEntity | null>(null);
  const [deleting, setDeleting] = useState<CategoryEntity | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Categorias</h1>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus size={16} />
          Nova categoria
        </Button>
      </header>

      <DataList isLoading={isLoading} isError={isError} isEmpty={isEmpty}>
        <DataList.Loading>
          <p className="text-text-muted">Carregando categorias...</p>
        </DataList.Loading>

        <DataList.Error>
          <Alert message={errorMessage ?? "Erro ao carregar as categorias"} />
        </DataList.Error>

        <DataList.Empty>
          <p className="text-text-muted">
            Você ainda não tem categorias. Crie a primeira.
          </p>
        </DataList.Empty>

        <DataList.Content>
          <CategoryList
            categories={categories}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        </DataList.Content>
      </DataList>

      <CreateCategoryModal open={createOpen} onOpenChange={setCreateOpen} />

      <EditCategoryModal
        category={editing}
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      />

      <DeleteCategoryModal
        category={deleting}
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      />
    </div>
  );
};
