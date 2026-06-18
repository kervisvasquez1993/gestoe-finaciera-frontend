import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  ghost: "bg-transparent text-text hover:bg-surface-hover",
  outline:
    "border border-border bg-transparent text-text hover:bg-surface-hover",
  danger: "bg-danger text-white hover:bg-danger/90",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  icon: "p-2",
};

export const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};
