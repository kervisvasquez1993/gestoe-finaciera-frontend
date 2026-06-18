import type { TransactionEntity } from "../../../domain/transaction/entities";
import { TransactionItem } from "./transaction-item";

interface TransactionListProps {
  transactions: TransactionEntity[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};
