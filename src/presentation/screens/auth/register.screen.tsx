import { RegisterForm } from "../../components/auth/register-form";

export const RegisterScreen = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text">Criar conta</h1>
        <p className="mt-1 text-sm text-text-muted">
          Preencha seus dados para começar
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};
