import type { PaginationMeta } from "../../../domain/shared/types";
import { useTransactionFiltersStore } from "../../stores/transaction-filters.store";

interface TransactionPaginationProps {
  meta: PaginationMeta;
}

export const TransactionPagination = ({ meta }: TransactionPaginationProps) => {
  const setPage = useTransactionFiltersStore((state) => state.setPage);

  const { page, totalPages, total } = meta;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-border pt-4">
      <span className="text-sm text-text-muted">
        Página {page} de {totalPages} · {total} registros
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
