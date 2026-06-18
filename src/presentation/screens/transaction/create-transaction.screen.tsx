import { Link } from "react-router-dom";
import { useCreateTransactionForm } from "../../hooks/transaction/use-create-transaction-form.hook";
import { TransactionForm } from "../../components/transaction/transaction-form";

export const CreateTransactionScreen = () => {
  const { control, errors, setValue, isPending, serverError, handleSubmit } =
    useCreateTransactionForm();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <header className="flex flex-col gap-1">
        <Link
          to="/dashboard/transactions"
          className="text-sm text-text-muted hover:underline"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-bold text-text">Nueva transacción</h1>
      </header>

      <TransactionForm
        control={control}
        errors={errors}
        setValue={setValue}
        isPending={isPending}
        serverError={serverError}
        onSubmit={handleSubmit}
        submitLabel="Crear transacción"
      />
    </div>
  );
};
