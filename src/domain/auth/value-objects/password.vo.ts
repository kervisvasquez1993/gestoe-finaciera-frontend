import { InvalidPasswordError } from "../errors";

export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Password {
    if (value.length < 6) {
      throw new InvalidPasswordError("A senha deve ter no mínimo 6 caracteres");
    }
    if (value.length > 100) {
      throw new InvalidPasswordError(
        "A senha não pode ultrapassar 100 caracteres",
      );
    }
    return new Password(value);
  }

  toString(): string {
    return this.value;
  }
}
