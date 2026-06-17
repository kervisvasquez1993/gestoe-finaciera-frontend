import { AuthSessionEntity, UserEntity } from "../../../domain/auth/entities";
import { Email } from "../../../domain/auth/value-objects";
import type { LoginResult, RegisterResult } from "../../interfaces";

export class AuthMapper {
  static toUserEntity(response: RegisterResult): UserEntity {
    return new UserEntity({
      id: response.id,
      name: response.name,
      email: Email.create(response.email),
    });
  }

  static toAuthSession(response: LoginResult): AuthSessionEntity {
    return new AuthSessionEntity({
      accessToken: response.accessToken,
      user: new UserEntity({
        id: response.user.id,
        name: response.user.name,
        email: Email.create(response.user.email),
      }),
    });
  }
}
