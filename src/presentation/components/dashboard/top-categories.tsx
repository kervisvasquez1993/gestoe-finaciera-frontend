import { ArrowRight } from "lucide-react";
import type { TopCategorySaida } from "../../../domain/dashboard/entities";
import { useGoToFilteredTransactions } from "../../hooks/transaction/use-go-to-filtered-transactions.hook";

interface TopCategoriesProps {
  categories: TopCategorySaida[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const TopCategories = ({ categories }: TopCategoriesProps) => {
  const { goWithFilters } = useGoToFilteredTransactions();

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-2 font-semibold text-text">
          Principais categorias de gastos
        </h2>
        <p className="text-sm text-text-muted">
          Não há gastos registrados neste período.
        </p>
      </div>
    );
  }

  const max = Math.max(...categories.map((c) => c.total));

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 font-semibold text-text">
        Principais categorias de gastos
      </h2>

      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div key={cat.categoryId} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-text">{cat.categoryName}</span>
              <div className="flex items-center gap-3">
                <span className="text-text-muted">
                  {formatCurrency(cat.total)}
                </span>
                <button
                  onClick={() =>
                    goWithFilters({
                      type: "saida",
                      categoryId: cat.categoryId,
                    })
                  }
                  className="flex items-center gap-1 whitespace-nowrap text-xs font-medium text-primary-600 hover:underline"
                >
                  Ver mais
                  <ArrowRight size={12} />
                </button>
              </div>
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

      <button
        onClick={() => goWithFilters({ type: "saida" })}
        className="mt-5 flex w-full items-center justify-center gap-1 rounded-lg border border-border py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-surface-hover hover:text-text"
      >
        Ver todas as transações
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
