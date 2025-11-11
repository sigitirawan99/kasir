import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DataActive } from "@/lib/sidebar";

interface OrganizationStore {
  selectedCompany: string;
  activeOrganization: DataActive | null;
  setSelectedCompany: (company: string) => void;
  setActiveOrganization: (organization: DataActive) => void;
  clearSelection: () => void;
}

export const useOrganizationStore = create<OrganizationStore>()(
  persist(
    (set) => ({
      selectedCompany: "",
      activeOrganization: null,
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setActiveOrganization: (organization) =>
        set({ activeOrganization: organization }),
      clearSelection: () =>
        set({ selectedCompany: "", activeOrganization: null }),
    }),
    {
      name: "organization-storage",
    }
  )
);
