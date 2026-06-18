import { useQuery } from "@tanstack/react-query";
import { userUseCases } from "../../../use-cases/user";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userUseCases.getMe(),
    staleTime: 1000 * 60 * 10,
  });
};
