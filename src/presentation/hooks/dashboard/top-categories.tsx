import { ArrowRight } from "lucide-react";
import type { TopCategorySaida } from "../../../domain/dashboard/entities";
import { useGoToFilteredTransactions } from "../transaction/use-go-to-filtered-transactions.hook";

interface TopCategoriesProps {
  categories: TopCategorySaida[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  const { goWithFilters } = useGoToFilteredTransactions();

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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-text">Top categorías de gastos</h2>
        <button
          onClick={() => goWithFilters({ type: "saida" })}
          className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
        >
          Ver gastos
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() =>
              goWithFilters({ type: "saida", categoryId: cat.categoryId })
            }
            className="group flex flex-col gap-1.5 rounded-lg p-2 text-left transition-colors hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-text group-hover:text-primary-600">
                {cat.categoryName}
              </span>
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
          </button>
        ))}
      </div>
    </div>
  );
};
