import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/theme.store";
import { validateToken } from "../utils/validate-token";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearSession = useAuthStore((state) => state.clearSession);

  const isValid = accessToken ? validateToken(accessToken) : false;

  if (accessToken && !isValid) {
    clearSession();
  }

  if (isValid) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
