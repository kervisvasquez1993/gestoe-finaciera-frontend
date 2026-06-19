import { ArrowDownCircle, ArrowUpCircle, Plus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

import { useDashboard } from "../../hooks/dashboard/use-dashboard.hook";

import { Alert, Button } from "../../components/ui";
import {
  PeriodFilter,
  SummaryCard,
  TopCategories,
} from "../../components/dashboard";
import { CategoriesOverview } from "../../hooks/dashboard/categories-overview";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const HomeScreen = () => {
  const { summary, isLoading, isError, errorMessage } = useDashboard();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Resumo</h1>
        <Link to="/dashboard/transactions/new">
          <Button>
            <Plus size={16} />
            Nova transação
          </Button>
        </Link>
      </header>

      <PeriodFilter />

      {isError && (
        <Alert message={errorMessage ?? "Erro ao carregar o resumo"} />
      )}

      {isLoading && <p className="text-text-muted">Carregando resumo...</p>}

      {summary && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Saldo atual"
              value={formatCurrency(summary.saldoAtual)}
              icon={<Wallet size={20} />}
              accent={summary.isPositive() ? "success" : "danger"}
            />
            <SummaryCard
              label="Total de entradas"
              value={formatCurrency(summary.totalEntradas)}
              icon={<ArrowUpCircle size={20} />}
              accent="success"
            />
            <SummaryCard
              label="Total de saídas"
              value={formatCurrency(summary.totalSaidas)}
              icon={<ArrowDownCircle size={20} />}
              accent="danger"
            />
          </div>

          <CategoriesOverview />

          <TopCategories categories={summary.topCategoriasSaidas} />
        </>
      )}
    </div>
  );
};
