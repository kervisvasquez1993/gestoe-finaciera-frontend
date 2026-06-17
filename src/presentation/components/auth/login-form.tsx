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
        label="Email"
        placeholder="tu@email.com"
      />
      <Form.Field
        name="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
      />

      <Button type="submit" isLoading={isPending}>
        Iniciar sesión
      </Button>

      <p className="text-center text-sm text-text-muted">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="font-medium text-primary-600">
          Registrate
        </Link>
      </p>
    </Form>
  );
};
