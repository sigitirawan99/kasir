import { create } from "zustand";

interface OrganizationStore {
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
  clearSelection: () => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  selectedCompany: "",
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  clearSelection: () => set({ selectedCompany: "" }),
}));
