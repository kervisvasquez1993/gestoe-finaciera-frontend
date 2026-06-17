import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "ghost";
}

export const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    ghost: "bg-transparent text-primary-600 hover:bg-surface-hover",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};
