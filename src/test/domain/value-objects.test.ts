import { describe, expect, it } from "vitest";
import { Email, Password } from "../../domain/auth/value-objects";
import {
  Money,
  TransactionType,
} from "../../domain/transaction/value-objects/value-objects";
import {
  InvalidEmailError,
  InvalidPasswordError,
} from "../../domain/auth/errors";
import {
  InvalidAmountError,
  InvalidTransactionTypeError,
} from "../../domain/transaction/errors";

describe("Email", () => {
  it("normaliza para minúsculas e remove espaços", () => {
    const email = Email.create("  Test@Mail.COM  ");
    expect(email.toString()).toBe("test@mail.com");
  });

  it("rejeita um email com formato inválido", () => {
    expect(() => Email.create("nao-eh-email")).toThrow(InvalidEmailError);
  });
});

describe("Password", () => {
  it("rejeita senhas com menos de 6 caracteres", () => {
    expect(() => Password.create("12345")).toThrow(InvalidPasswordError);
  });

  it("aceita uma senha válida", () => {
    expect(() => Password.create("123456")).not.toThrow();
  });
});

describe("Money", () => {
  it("rejeita valores não positivos", () => {
    expect(() => Money.create(0)).toThrow(InvalidAmountError);
    expect(() => Money.create(-10)).toThrow(InvalidAmountError);
  });

  it("rejeita valores com mais de 2 casas decimais", () => {
    expect(() => Money.create(10.999)).toThrow(InvalidAmountError);
  });

  it("aceita um valor válido com 2 casas decimais", () => {
    expect(Money.create(89.9).toNumber()).toBe(89.9);
  });
});

describe("TransactionType", () => {
  it("distingue entrada de saída", () => {
    expect(TransactionType.create("saida").isSaida()).toBe(true);
    expect(TransactionType.create("entrada").isEntrada()).toBe(true);
  });

  it("rejeita um tipo inválido", () => {
    expect(() => TransactionType.create("outro")).toThrow(
      InvalidTransactionTypeError,
    );
  });
});
