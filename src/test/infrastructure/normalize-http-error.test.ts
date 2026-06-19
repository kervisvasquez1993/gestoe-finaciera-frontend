import { describe, expect, it } from "vitest";
import { normalizeHttpError } from "../../infrastructure/api/http-error";

describe("normalizeHttpError", () => {
  it("extrai statusCode e mensagem de um erro com response", () => {
    const error = {
      response: {
        status: 409,
        data: { statusCode: 409, message: "Email já registrado" },
      },
    };

    const result = normalizeHttpError(error);

    expect(result.statusCode).toBe(409);
    expect(result.messages).toEqual(["Email já registrado"]);
  });

  it("suporta message como array (validação do class-validator)", () => {
    const error = {
      response: {
        status: 400,
        data: {
          statusCode: 400,
          message: ["email inválido", "senha muito curta"],
        },
      },
    };

    const result = normalizeHttpError(error);

    expect(result.messages).toHaveLength(2);
    expect(result.messages).toContain("senha muito curta");
  });

  it("retorna statusCode 0 e mensagem genérica em erro de rede", () => {
    const result = normalizeHttpError(new Error("Network Error"));

    expect(result.statusCode).toBe(0);
    expect(result.messages[0]).toBeTruthy();
  });
});
