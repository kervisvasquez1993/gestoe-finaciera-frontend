import { LoginForm } from "../../components/auth/login-form";

export const LoginScreen = () => {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-text">Bem-vindo</h1>
        <p className="mt-1 text-sm text-text-muted">
          Acesse sua conta para continuar
        </p>
      </div>
      <LoginForm />
    </div>
  );
};
