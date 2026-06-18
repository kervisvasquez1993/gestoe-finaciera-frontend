import { Link } from "react-router-dom";
import type { TransactionEntity } from "../../../domain/transaction/entities";

interface TransactionItemProps {
  transaction: TransactionEntity;
}

const formatAmount = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isSaida = transaction.type.isSaida();

  return (
    <Link
      to={`/dashboard/transactions/${transaction.id}/edit`}
      className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-hover"
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-text">{transaction.description}</span>
        <span className="text-sm text-text-muted">
          {transaction.category?.name.toString() ?? "Sin categoría"} ·{" "}
          {transaction.date}
        </span>
      </div>

      <span
        className={`font-semibold ${isSaida ? "text-danger" : "text-success"}`}
      >
        {isSaida ? "-" : "+"}
        {formatAmount(transaction.amount.toNumber())}
      </span>
    </Link>
  );
};
