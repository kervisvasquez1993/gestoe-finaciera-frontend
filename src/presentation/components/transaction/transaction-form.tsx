import { Controller } from "react-hook-form";
import type { Control, FieldErrors, UseFormSetValue } from "react-hook-form";

import { Button, Form, Input, Select } from "../ui";
import { CategorySelectField } from "./category-select-field";
import type { CreateTransactionFormInput } from "../../schemas/transaction";

const TYPE_OPTIONS = [
  { value: "entrada", label: "Entrada" },
  { value: "saida", label: "Saída" },
];

interface TransactionFormProps {
  control: Control<CreateTransactionFormInput>;
  errors: FieldErrors<CreateTransactionFormInput>;
  setValue: UseFormSetValue<CreateTransactionFormInput>;
  isPending: boolean;
  serverError: string | null;
  onSubmit: () => void;
  submitLabel: string;
}

export const TransactionForm = ({
  control,
  errors,
  setValue,
  isPending,
  serverError,
  onSubmit,
  submitLabel,
}: TransactionFormProps) => {
  return (
    <Form control={control} errors={errors} onSubmit={onSubmit}>
      <Form.Error message={serverError} />

      <Form.Field
        name="description"
        label="Descrição"
        placeholder="Ex: Compra do mercado"
      />

      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Input
            id="amount"
            type="number"
            step="0.01"
            label="Valor"
            placeholder="0.00"
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            onBlur={field.onBlur}
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            id="type"
            label="Tipo"
            placeholder="Selecione um tipo"
            options={TYPE_OPTIONS}
            error={errors.type?.message}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="date"
            type="date"
            label="Data"
            error={errors.date?.message}
          />
        )}
      />

      <CategorySelectField
        control={control}
        setValue={setValue}
        name="categoryId"
        error={errors.categoryId?.message}
      />

      <Button type="submit" isLoading={isPending}>
        {submitLabel}
      </Button>
    </Form>
  );
};
