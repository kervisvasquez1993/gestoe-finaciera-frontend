import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { useDashboard } from "../../hooks/dashboard/use-dashboard.hook";
import {
  PeriodFilter,
  SummaryCard,
  TopCategories,
} from "../../components/dashboard";
import { Alert } from "../../components/ui";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const HomeScreen = () => {
  const { summary, isLoading, isError, errorMessage } = useDashboard();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Resumen</h1>

      <PeriodFilter />

      {isError && (
        <Alert message={errorMessage ?? "Error al cargar el resumen"} />
      )}

      {isLoading && <p className="text-text-muted">Cargando resumen...</p>}

      {summary && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Saldo actual"
              value={formatCurrency(summary.saldoAtual)}
              icon={<Wallet size={20} />}
              accent={summary.isPositive() ? "success" : "danger"}
            />
            <SummaryCard
              label="Total entradas"
              value={formatCurrency(summary.totalEntradas)}
              icon={<ArrowUpCircle size={20} />}
              accent="success"
            />
            <SummaryCard
              label="Total salidas"
              value={formatCurrency(summary.totalSaidas)}
              icon={<ArrowDownCircle size={20} />}
              accent="danger"
            />
          </div>

          <TopCategories categories={summary.topCategoriasSaidas} />
        </>
      )}
    </div>
  );
};
