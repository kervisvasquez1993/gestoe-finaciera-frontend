import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      setSession: (token, user) =>
        set({ accessToken: token, user, isAuthenticated: true }),
      clearSession: () =>
        set({ accessToken: null, user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" },
  ),
);
