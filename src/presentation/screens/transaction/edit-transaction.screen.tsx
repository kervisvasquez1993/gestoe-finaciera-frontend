import { Link, useParams } from "react-router-dom";
import { useEditTransactionForm } from "../../hooks/transaction/use-edit-transaction-form.hook";
import { DeleteTransactionButton } from "../../components/transaction/delete-transaction-button";
import { Alert } from "../../components/ui";
import { TransactionForm } from "../../components/transaction/transaction-form";

export const EditTransactionScreen = () => {
  const { id = "" } = useParams();
  const {
    control,
    errors,
    setValue,
    isPending,
    serverError,
    isLoading,
    isError,
    notFound,
    handleSubmit,
  } = useEditTransactionForm(id);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Link
            to="/dashboard/transactions"
            className="text-sm text-text-muted hover:underline"
          >
            ← Voltar
          </Link>
          <h1 className="text-2xl font-bold text-text">Editar transação</h1>
        </div>
        {!isLoading && !notFound && <DeleteTransactionButton id={id} />}
      </header>

      {isLoading && <p className="text-text-muted">Carregando transação...</p>}

      {isError && <Alert message="Erro ao carregar a transação" />}

      {notFound && <Alert message="A transação não existe ou não é sua" />}

      {!isLoading && !isError && !notFound && (
        <TransactionForm
          control={control}
          errors={errors}
          setValue={setValue}
          isPending={isPending}
          serverError={serverError}
          onSubmit={handleSubmit}
          submitLabel="Salvar alterações"
        />
      )}
    </div>
  );
};
