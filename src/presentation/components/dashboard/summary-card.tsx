import type { ReactNode } from "react";

interface SummaryCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  accent?: "default" | "success" | "danger";
}

const ACCENTS = {
  default: "text-text",
  success: "text-success",
  danger: "text-danger",
};

export const SummaryCard = ({
  label,
  value,
  icon,
  accent = "default",
}: SummaryCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-muted">{label}</span>
        <span className={ACCENTS[accent]}>{icon}</span>
      </div>
      <span className={`text-2xl font-bold ${ACCENTS[accent]}`}>{value}</span>
    </div>
  );
};
