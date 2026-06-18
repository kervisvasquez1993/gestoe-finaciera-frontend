import type { UserEntity } from "../../auth/entities";

export interface IUserUseCases {
  getMe(): Promise<UserEntity>;
}
