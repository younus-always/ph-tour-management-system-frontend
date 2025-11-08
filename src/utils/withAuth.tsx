import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) =>
      function AuthWrapper() {
            const { data, isLoading } = useUserInfoQuery(undefined);
            const { email, role } = data?.data || {};

            if (!email && !isLoading) {
                  return <Navigate to="/login" />
            }
            if (requiredRole && !isLoading && requiredRole !== role) {
                  return <Navigate to="/unauthorized" />
            }
            return <Component />;
      };