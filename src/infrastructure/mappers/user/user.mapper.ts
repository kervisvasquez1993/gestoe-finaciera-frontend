import { UserEntity } from "../../../domain/auth/entities";
import { Email } from "../../../domain/auth/value-objects";
import type { UserResponse } from "../../interfaces";

export class UserMapper {
  static toEntity(response: UserResponse): UserEntity {
    return new UserEntity({
      id: response.id,
      name: response.name,
      email: Email.create(response.email),
      createdAt: response.createdAt,
    });
  }
}
