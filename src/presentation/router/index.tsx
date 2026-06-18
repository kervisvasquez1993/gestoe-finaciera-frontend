import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./public.router";
import { AuthLayout } from "../layouts/auth.layout";
import { LoginScreen } from "../screens/auth/login.screen";
import { RegisterScreen } from "../screens/auth/register.screen";
import PrivateRoute from "./private.router";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { HomeScreen } from "../screens/home/home.screen";
import { CategoriesScreen } from "../screens/category/categories.screen";
import { TransactionsScreen } from "../screens/transaction/transactions.screen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginScreen /> },
      { path: "register", element: <RegisterScreen /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "categories", element: <CategoriesScreen /> },
      { path: "transactions", element: <TransactionsScreen /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
