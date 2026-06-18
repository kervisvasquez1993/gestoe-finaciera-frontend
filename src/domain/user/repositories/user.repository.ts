import type { UserEntity } from "../../auth/entities";

export interface IUserRepository {
  getMe(): Promise<UserEntity>;
}
