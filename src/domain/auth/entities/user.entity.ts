import type { Email } from "../value-objects";

export interface UserEntityProps {
  id: string;
  name: string;
  email: Email;
  createdAt?: string;
}

export class UserEntity {
  private readonly props: UserEntityProps;

  constructor(props: UserEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): Email {
    return this.props.email;
  }
  get createdAt(): string | undefined {
    return this.props.createdAt;
  }
}
