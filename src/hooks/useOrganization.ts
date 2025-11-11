import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { Organization } from "@/lib/types";
import type {
  OrganizationResponse,
  SessionResponse,
  DataActive,
} from "@/lib/sidebar";
import { useOrganizationStore } from "@/components/organization/useOrganizationStore";
import { useAuthStore } from "@/store/useAuthStore";

// Query untuk list organisasi
export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<Organization[]>(
        "/auth/organization/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
}

// Query untuk active organization
export function useActiveOrganization() {
  return useQuery({
    queryKey: ["activeOrganization"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<OrganizationResponse>(
        "/auth/organization/get-full-organization",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
  });
}

// Query untuk session/user data
export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await api.get<SessionResponse>("/auth/get-session", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });
}

// Mutation untuk set active organization
export function useSetActiveOrganization() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setActiveOrganization } = useOrganizationStore();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (organizationId: string) => {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/auth/organization/set-active",
        { organizationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      // Invalidate dan refetch data
      await queryClient.invalidateQueries({ queryKey: ["activeOrganization"] });
      await queryClient.invalidateQueries({ queryKey: ["session"] });

      // Refetch untuk update store
      const [orgData, sessionData] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: ["activeOrganization"],
          queryFn: async () => {
            const token = localStorage.getItem("token");
            const response = await api.get<OrganizationResponse>(
              "/auth/organization/get-full-organization",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return response.data;
          },
        }),
        queryClient.fetchQuery({
          queryKey: ["session"],
          queryFn: async () => {
            const token = localStorage.getItem("token");
            const response = await api.get<SessionResponse>(
              "/auth/get-session",
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return response.data;
          },
        }),
      ]);

      // Update Zustand stores
      setActiveOrganization({
        id: orgData.id,
        name: orgData.name,
        plan: orgData.plan,
        logo: orgData.logo,
      });
      setUser(sessionData.user);

      router.push("/dashboard");
    },
  });
}
