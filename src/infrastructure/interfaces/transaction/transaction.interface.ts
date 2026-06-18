import type { CategoryResponse } from "../category/category.interface";

export interface TransactionResponse {
  id: string;
  description: string;
  amount: number;
  type: "entrada" | "saida";
  date: string;
  categoryId: string;
  category?: CategoryResponse;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  description: string;
  amount: number;
  type: "entrada" | "saida";
  date: string;
  categoryId: string;
}

export interface UpdateTransactionPayload {
  description?: string;
  amount?: number;
  type?: "entrada" | "saida";
  date?: string;
  categoryId?: string;
}

export interface FilterTransactionsParams {
  type?: "entrada" | "saida";
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}
