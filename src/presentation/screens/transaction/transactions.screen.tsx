import { Link } from "react-router-dom";
import { useTransactions } from "../../hooks/transaction/use-transactions.hook";
import { Alert, Button, DataList } from "../../components/ui";
import {
  FilterSection,
  TransactionList,
  TransactionPagination,
} from "../../components/transaction";

export const TransactionsScreen = () => {
  const { transactions, meta, isLoading, isError, isEmpty, errorMessage } =
    useTransactions();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Transações</h1>
        <Link to="/dashboard/transactions/new">
          <Button className="w-auto">Nova transação</Button>
        </Link>
      </header>

      <FilterSection />

      <DataList isLoading={isLoading} isError={isError} isEmpty={isEmpty}>
        <DataList.Loading>
          <p className="text-text-muted">Carregando transações...</p>
        </DataList.Loading>

        <DataList.Error>
          <Alert message={errorMessage ?? "Erro ao carregar as transações"} />
        </DataList.Error>

        <DataList.Empty>
          <p className="text-text-muted">
            Nenhuma transação corresponde. Crie uma ou ajuste os filtros.
          </p>
        </DataList.Empty>

        <DataList.Content>
          <div className="flex flex-col gap-4">
            <TransactionList transactions={transactions} />
            {meta && <TransactionPagination meta={meta} />}
          </div>
        </DataList.Content>
      </DataList>
    </div>
  );
};
