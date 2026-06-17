import type { ILoginRequest, IRegisterRequest } from "../../../domain/auth/dto";
import type {
  AuthSessionEntity,
  UserEntity,
} from "../../../domain/auth/entities";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UnexpectedError,
  ValidationError,
} from "../../../domain/auth/errors";
import type { IAuthRepository } from "../../../domain/auth/repositories";
import { loginAction, registerAction } from "../../actions/auth";
import { normalizeHttpError } from "../../api/http-error";
import { AuthMapper } from "../../mappers/auth";

export class AuthRepositoryImpl implements IAuthRepository {
  async register(data: IRegisterRequest): Promise<UserEntity> {
    try {
      const response = await registerAction(data);
      return AuthMapper.toUserEntity(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  async login(data: ILoginRequest): Promise<AuthSessionEntity> {
    try {
      const response = await loginAction(data);
      return AuthMapper.toAuthSession(response);
    } catch (error) {
      throw this.mapError(error);
    }
  }

  private mapError(error: unknown) {
    const { statusCode, messages } = normalizeHttpError(error);

    switch (statusCode) {
      case 400:
        return new ValidationError(messages);
      case 401:
        return new InvalidCredentialsError(messages[0]);
      case 409:
        return new EmailAlreadyExistsError(messages[0]);
      default:
        return new UnexpectedError(messages[0]);
    }
  }
}

export const authRepository: IAuthRepository = new AuthRepositoryImpl();
