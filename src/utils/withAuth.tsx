import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRoles?: TRole | TRole[]) =>
      function AuthWrapper() {
            const { data, isLoading } = useUserInfoQuery(undefined);
            const location = useLocation();
            const { email, role } = data?.data || {};
            //  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
            if (!isLoading && !email) {
                  return <Navigate to="/login" state={location.pathname} />
            }
            if (!isLoading && requiredRoles) {
                  if (!requiredRoles.includes(role)) {
                        return <Navigate to="/unauthorized" />
                  }
            }
            return <Component />;
      };