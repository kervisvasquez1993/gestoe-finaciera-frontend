import { InvalidPasswordError } from "../errors";

export class Password {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Password {
    if (value.length < 6) {
      throw new InvalidPasswordError(
        "La contraseña debe tener al menos 6 caracteres",
      );
    }
    if (value.length > 100) {
      throw new InvalidPasswordError(
        "La contraseña no puede superar 100 caracteres",
      );
    }
    return new Password(value);
  }

  toString(): string {
    return this.value;
  }
}
