import type { ILoginRequest, IRegisterRequest } from "../dto";
import type { AuthSessionEntity, UserEntity } from "../entities";

export interface IAuthUseCases {
  register(data: IRegisterRequest): Promise<UserEntity>;
  login(data: ILoginRequest): Promise<AuthSessionEntity>;
}
