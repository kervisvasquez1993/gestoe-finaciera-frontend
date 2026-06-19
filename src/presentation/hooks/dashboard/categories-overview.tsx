import { Link } from "react-router-dom";
import { ArrowRight, FolderOpen } from "lucide-react";
import { useCategoriesSummary } from "../category/use-categories-summary.hook";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const CategoriesOverview = () => {
  const { summaries, isLoading, isEmpty } = useCategoriesSummary();

  // mostra as primeiras 4 com mais movimento
  const top = [...summaries]
    .sort((a, b) => b.transactionsCount - a.transactionsCount)
    .slice(0, 4);

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-text">Categorias</h2>
        <Link
          to="/dashboard/categories"
          className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline"
        >
          Gerenciar
          <ArrowRight size={14} />
        </Link>
      </div>

      {isLoading && <p className="text-sm text-text-muted">Carregando...</p>}

      {isEmpty && (
        <p className="text-sm text-text-muted">
          Você ainda não tem categorias.
        </p>
      )}

      {!isLoading && !isEmpty && (
        <div className="grid gap-3 sm:grid-cols-2">
          {top.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <FolderOpen size={16} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text">
                    {cat.name.toString()}
                  </span>
                  <span className="text-xs text-text-muted">
                    {cat.transactionsCount}{" "}
                    {cat.transactionsCount === 1 ? "movimento" : "movimentos"}
                  </span>
                </div>
              </div>
              <span className="text-sm font-semibold text-danger">
                {formatCurrency(cat.totalSaidas)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
