import { useAuthStore } from "../../stores/theme.store";

export const HomeScreen = () => {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-text">
        Hola, {user?.name ?? "usuario"}
      </h1>
      <button
        onClick={clearSession}
        className="self-start rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white"
      >
        Cerrar sesión
      </button>
    </div>
  );
};
