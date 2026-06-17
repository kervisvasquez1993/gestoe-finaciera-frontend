import { RegisterForm } from "../../components/auth/register-form";

export const RegisterScreen = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text">Crear cuenta</h1>
        <p className="mt-1 text-sm text-text-muted">
          Completá tus datos para empezar
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};
