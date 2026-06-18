import { create } from "zustand";
import type { TransactionTypeValue } from "../../domain/transaction/value-objects/value-objects";

export interface TransactionFilters {
  type?: TransactionTypeValue;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
}

const DEFAULT_FILTERS: TransactionFilters = {
  type: undefined,
  categoryId: undefined,
  startDate: undefined,
  endDate: undefined,
  page: 1,
  limit: 10,
};

interface TransactionFiltersState {
  filters: TransactionFilters;
  setFilter: <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTransactionFiltersStore = create<TransactionFiltersState>(
  (set) => ({
    filters: DEFAULT_FILTERS,
    setFilter: (key, value) =>
      set((state) => ({
        // Al cambiar cualquier filtro (menos page), volvemos a página 1
        filters: {
          ...state.filters,
          [key]: value,
          ...(key !== "page" ? { page: 1 } : {}),
        },
      })),
    setPage: (page) =>
      set((state) => ({ filters: { ...state.filters, page } })),
    resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  }),
);
