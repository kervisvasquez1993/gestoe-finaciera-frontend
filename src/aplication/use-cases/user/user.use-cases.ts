import type { UserEntity } from "../../../domain/auth/entities";
import type { IUserRepository } from "../../../domain/user/repositories";
import type { IUserUseCases } from "../../../domain/user/use-cases";
import { userRepository } from "../../../infrastructure/repositories/user";

export class UserUseCases implements IUserUseCases {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  getMe(): Promise<UserEntity> {
    return this.repository.getMe();
  }
}

export const userUseCases = new UserUseCases(userRepository);
