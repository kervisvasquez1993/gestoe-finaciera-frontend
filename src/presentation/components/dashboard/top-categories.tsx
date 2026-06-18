import type { TopCategorySaida } from "../../../domain/dashboard/entities";

interface TopCategoriesProps {
  categories: TopCategorySaida[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-2 font-semibold text-text">
          Top categorías de gastos
        </h2>
        <p className="text-sm text-text-muted">
          No hay gastos registrados en este período.
        </p>
      </div>
    );
  }

  const max = Math.max(...categories.map((c) => c.total));

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 font-semibold text-text">Top categorías de gastos</h2>
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div key={cat.categoryId} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-text">{cat.categoryName}</span>
              <span className="text-text-muted">
                {formatCurrency(cat.total)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-hover">
              <div
                className="h-full rounded-full bg-danger transition-all"
                style={{ width: `${(cat.total / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
