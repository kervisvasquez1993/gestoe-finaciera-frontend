import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/presentation/stores/auth.store";
import type { ILoginRequest } from "../../../../domain/auth/dto";
import { authUseCases } from "../../../use-cases/auth";

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (data: ILoginRequest) => authUseCases.login(data),
    onSuccess: (session) => {
      setSession(session.accessToken, {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email.toString(),
      });
    },
  });
};
