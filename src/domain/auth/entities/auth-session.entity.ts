import type { UserEntity } from "./user.entity";

export interface AuthSessionProps {
  accessToken: string;
  user: UserEntity;
}

export class AuthSessionEntity {
  private readonly props: AuthSessionProps;

  constructor(props: AuthSessionProps) {
    this.props = props;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }
  get user(): UserEntity {
    return this.props.user;
  }
}
