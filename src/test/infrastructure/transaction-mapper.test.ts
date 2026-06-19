import { describe, expect, it } from "vitest";
import type { TransactionResponse } from "../../infrastructure/interfaces";
import { TransactionMapper } from "../../infrastructure/mappers/transaction";

const baseResponse: TransactionResponse = {
  id: "tx-1",
  description: "Compra de insumos",
  amount: 89.9,
  type: "saida",
  date: "2026-06-14",
  categoryId: "cat-1",
  category: {
    id: "cat-1",
    name: "Insumos",
    description: null,
    userId: "user-1",
    createdAt: "2026-06-17T02:10:44.093Z",
    updatedAt: "2026-06-17T02:12:13.767Z",
  },
  userId: "user-1",
  createdAt: "2026-06-17T02:42:54.995Z",
  updatedAt: "2026-06-17T02:42:54.995Z",
};

describe("TransactionMapper", () => {
  it("mapeia a resposta para uma entidade de domínio com seus value objects", () => {
    const entity = TransactionMapper.toEntity(baseResponse);

    expect(entity.id).toBe("tx-1");
    expect(entity.amount.toNumber()).toBe(89.9);
    expect(entity.type.isSaida()).toBe(true);
    expect(entity.category?.name.toString()).toBe("Insumos");
  });

  it("calcula o valor com sinal negativo para saídas", () => {
    const entity = TransactionMapper.toEntity(baseResponse);
    expect(entity.signedAmount()).toBe(-89.9);
  });

  it("mapeia a estrutura paginada preservando o meta", () => {
    const result = TransactionMapper.toPaginatedResult({
      data: [baseResponse],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    });

    expect(result.data).toHaveLength(1);
    expect(result.meta.total).toBe(1);
  });
});
