import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ITransactionRepository } from "../../domain/transaction/repositories";
import type { ICreateTransactionRequest } from "../../domain/transaction/dto";
import { TransactionUseCases } from "../../aplication/use-cases/transaction";
import { InvalidAmountError } from "../../domain/transaction/errors";

const makeRepo = (): ITransactionRepository => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
});

const validData: ICreateTransactionRequest = {
  description: "Pagamento a fornecedor",
  amount: 200,
  type: "saida",
  date: "2026-06-16",
  categoryId: "cat-1",
};

describe("TransactionUseCases.create", () => {
  let repo: ITransactionRepository;
  let useCases: TransactionUseCases;

  beforeEach(() => {
    repo = makeRepo();
    useCases = new TransactionUseCases(repo);
  });

  it("valida o valor antes de chamar o repositório", async () => {
    await expect(async () =>
      useCases.create({ ...validData, amount: -50 }),
    ).rejects.toThrow(InvalidAmountError);

    expect(repo.create).not.toHaveBeenCalled();
  });

  it("delega ao repositório quando os dados são válidos", async () => {
    await useCases.create(validData);

    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(repo.create).toHaveBeenCalledWith(validData);
  });
});
