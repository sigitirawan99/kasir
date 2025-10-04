"use client";

import * as React from "react";
import api from "@/lib/api";
import type {
  User,
  DataActive,
  OrganizationResponse,
  SessionResponse,
  UseSidebarDataReturn,
} from "@/lib/sidebar";
import { AxiosError } from "axios";

export function useSidebarData(): UseSidebarDataReturn {
  const [dataActive, setDataActive] = React.useState<DataActive | undefined>();
  const [user, setUser] = React.useState<User>({
    name: "error",
    email: "error@error.com",
    avatar: "/avatars/shadcn.jpg",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setError(null);
      const [orgResponse, sessionResponse] = await Promise.all([
        api.get<OrganizationResponse>(
          "/auth/organization/get-full-organization",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        api.get<SessionResponse>("/auth/get-session", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setDataActive({
        id: orgResponse.data.id,
        name: orgResponse.data.name,
        plan: orgResponse.data.plan,
        logo: orgResponse.data.logo,
      });
      setUser(sessionResponse.data.user);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error fetching data:", error);
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { dataActive, user, isLoading, error, refetch: fetchData };
}
