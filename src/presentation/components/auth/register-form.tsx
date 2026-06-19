import { Link } from "react-router-dom";

import { useRegisterForm } from "../../hooks/auth/use-register-form.hook";
import { Button, Form } from "../ui";

export const RegisterForm = () => {
  const {
    control,
    errors,
    isPending,
    serverError,
    successMessage,
    handleSubmit,
  } = useRegisterForm();

  return (
    <Form control={control} errors={errors} onSubmit={handleSubmit}>
      <Form.Error message={serverError} />
      <Form.Success message={successMessage} />

      <Form.Field name="name" label="Nome" placeholder="Seu nome" />
      <Form.Field
        name="email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
      />
      <Form.Field
        name="password"
        type="password"
        label="Senha"
        placeholder="••••••••"
      />

      <Button type="submit" isLoading={isPending}>
        Criar conta
      </Button>

      <p className="text-center text-sm text-text-muted">
        Já tem conta?{" "}
        <Link to="/login" className="font-medium text-primary-600">
          Entre
        </Link>
      </p>
    </Form>
  );
};
