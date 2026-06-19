import { Link } from "react-router-dom";

import { useLoginForm } from "../../hooks/auth/use-login-form.hook";
import { Button, Form } from "../ui";

export const LoginForm = () => {
  const { control, errors, isPending, serverError, handleSubmit } =
    useLoginForm();

  return (
    <Form control={control} errors={errors} onSubmit={handleSubmit}>
      <Form.Error message={serverError} />

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
        Entrar
      </Button>

      <p className="text-center text-sm text-text-muted">
        Não tem conta?{" "}
        <Link to="/register" className="font-medium text-primary-600">
          Cadastre-se
        </Link>
      </p>
    </Form>
  );
};
