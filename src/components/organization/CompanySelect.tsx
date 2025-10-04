"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useOrganizationStore } from "./useOrganizationStore";
import { Organization } from "@/lib/types";

interface CompanySelectProps {
  organizations: Organization[];
}

export const CompanySelect = ({ organizations }: CompanySelectProps) => {
  const { selectedCompany, setSelectedCompany } = useOrganizationStore();

  const handleCompanySelect = (value: string) => {
    setSelectedCompany(value);
  };

  return (
    <div>
      <Label className="mb-2 block">Perusahaan</Label>
      <Select onValueChange={handleCompanySelect} value={selectedCompany}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih Perusahaan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedCompany && (
        <div className="bg-gray-50 border border-gray-200 p-3 mt-4 rounded-md font-medium">
          <p>{organizations.find((org) => org.id === selectedCompany)?.name}</p>
        </div>
      )}
    </div>
  );
};
