import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

import { Button } from "../ui";
import { DeleteTransactionButton } from "./delete-transaction-button";
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
  const navigate = useNavigate();
  const isSaida = transaction.type.isSaida();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary-300">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
            isSaida ? "bg-danger/10 text-danger" : "bg-success/10 text-success"
          }`}
        >
          {isSaida ? "−" : "+"}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-text">
            {transaction.description}
          </span>
          <span className="text-sm text-text-muted">
            {transaction.category?.name.toString() ?? "Sin categoría"} ·{" "}
            {transaction.date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`font-semibold ${isSaida ? "text-danger" : "text-success"}`}
        >
          {isSaida ? "-" : "+"}
          {formatAmount(transaction.amount.toNumber())}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Editar"
            onClick={() =>
              navigate(`/dashboard/transactions/${transaction.id}/edit`)
            }
          >
            <Pencil size={16} />
          </Button>
          <DeleteTransactionButton id={transaction.id} />
        </div>
      </div>
    </div>
  );
};
