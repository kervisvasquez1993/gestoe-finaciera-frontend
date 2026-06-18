import { create } from "zustand";

interface SelectedCategoryState {
  lastCreatedId: string | null;
  setLastCreatedId: (id: string | null) => void;
  clear: () => void;
}

export const useSelectedCategoryStore = create<SelectedCategoryState>(
  (set) => ({
    lastCreatedId: null,
    setLastCreatedId: (id) => set({ lastCreatedId: id }),
    clear: () => set({ lastCreatedId: null }),
  }),
);
