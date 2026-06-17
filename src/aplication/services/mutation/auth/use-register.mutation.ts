import { useMutation } from "@tanstack/react-query";
import type { IRegisterRequest } from "../../../../domain/auth/dto";
import { authUseCases } from "../../../use-cases/auth";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: IRegisterRequest) => authUseCases.register(data),
  });
};
