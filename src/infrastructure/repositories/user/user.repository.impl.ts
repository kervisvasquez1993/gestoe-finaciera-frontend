import type { UserEntity } from "../../../domain/auth/entities";
import { UnexpectedError } from "../../../domain/shared/errors";
import type { IUserRepository } from "../../../domain/user/repositories";
import { getMeAction } from "../../actions/user";
import { normalizeHttpError } from "../../api/http-error";
import { UserMapper } from "../../mappers/user";

export class UserRepositoryImpl implements IUserRepository {
  async getMe(): Promise<UserEntity> {
    try {
      const response = await getMeAction();
      return UserMapper.toEntity(response);
    } catch (error) {
      const { messages } = normalizeHttpError(error);
      throw new UnexpectedError(messages[0]);
    }
  }
}

export const userRepository: IUserRepository = new UserRepositoryImpl();
