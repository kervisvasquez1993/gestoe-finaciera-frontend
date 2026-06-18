import { CategoryList } from "../../components/category/category-list";
import { Alert, DataList } from "../../components/ui";
import { useCategories } from "../../hooks/category/use-categories.hook";

export const CategoriesScreen = () => {
  const { categories, isLoading, isError, isEmpty, errorMessage } =
    useCategories();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Categorías</h1>
      </header>

      <DataList isLoading={isLoading} isError={isError} isEmpty={isEmpty}>
        <DataList.Loading>
          <p className="text-text-muted">Cargando categorías...</p>
        </DataList.Loading>

        <DataList.Error>
          <Alert message={errorMessage ?? "Error al cargar las categorías"} />
        </DataList.Error>

        <DataList.Empty>
          <p className="text-text-muted">
            No tenés categorías todavía. Creá la primera.
          </p>
        </DataList.Empty>

        <DataList.Content>
          <CategoryList categories={categories} />
        </DataList.Content>
      </DataList>
    </div>
  );
};
