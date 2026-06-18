import { LogOut } from "lucide-react";

import { Button, ThemeToggle } from "../ui";
import { getInitials } from "../../utils/get-initials";
import { useAuthStore } from "../../stores/auth.store";
import { useMeQuery } from "../../../aplication/services/query/user/use-me.query";

export const DashboardHeader = () => {
  const { data: me } = useMeQuery();
  const storeUser = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const name = me?.name ?? storeUser?.name ?? "Usuario";
  const email = me?.email.toString() ?? storeUser?.email ?? "";

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
            {getInitials(name)}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-text">{name}</span>
            <span className="text-sm text-text-muted">{email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={clearSession}>
            <LogOut size={16} />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
};
