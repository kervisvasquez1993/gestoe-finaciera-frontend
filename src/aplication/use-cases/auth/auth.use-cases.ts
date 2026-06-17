import type { ILoginRequest, IRegisterRequest } from "../../../domain/auth/dto";
import type {
  AuthSessionEntity,
  UserEntity,
} from "../../../domain/auth/entities";
import type { IAuthRepository } from "../../../domain/auth/repositories";
import type { IAuthUseCases } from "../../../domain/auth/use-cases";
import { Email, Password } from "../../../domain/auth/value-objects";
import { authRepository } from "../../../infrastructure/repositories/auth";

export class AuthUseCases implements IAuthUseCases {
  private readonly repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  async register(data: IRegisterRequest): Promise<UserEntity> {
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    return this.repository.register({
      name: data.name.trim(),
      email: email.toString(),
      password: password.toString(),
    });
  }

  async login(data: ILoginRequest): Promise<AuthSessionEntity> {
    const email = Email.create(data.email);
    const password = Password.create(data.password);

    return this.repository.login({
      email: email.toString(),
      password: password.toString(),
    });
  }
}

export const authUseCases = new AuthUseCases(authRepository);
