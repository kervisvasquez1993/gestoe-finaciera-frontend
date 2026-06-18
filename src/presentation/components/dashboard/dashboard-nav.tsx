import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/dashboard", label: "Resumen", end: true },
  { to: "/dashboard/transactions", label: "Transacciones", end: false },
  { to: "/dashboard/categories", label: "Categorías", end: false },
];

export const DashboardNav = () => {
  return (
    <nav className="mx-auto flex max-w-6xl gap-1 px-6">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-text-muted hover:text-text"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
