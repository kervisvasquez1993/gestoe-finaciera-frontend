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

      <Form.Field name="name" label="Nombre" placeholder="Tu nombre" />
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
        Crear cuenta
      </Button>

      <p className="text-center text-sm text-text-muted">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-medium text-primary-600">
          Iniciá sesión
        </Link>
      </p>
    </Form>
  );
};
