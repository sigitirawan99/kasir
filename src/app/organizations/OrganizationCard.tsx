"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganizationStore } from "../../components/organization/useOrganizationStore";
import { CompanySelect } from "../../components/organization/CompanySelect";
import { Spinner } from "@/components/ui/spinner";
import {
  useOrganizations,
  useSetActiveOrganization,
} from "@/hooks/useOrganization";

export const OrganizationCard = () => {
  const { selectedCompany } = useOrganizationStore();
  const { data: organizations = [], isLoading: isLoadingOrgs } =
    useOrganizations();
  const setActiveOrgMutation = useSetActiveOrganization();

  const handleContinue = () => {
    if (!selectedCompany) return;
    setActiveOrgMutation.mutate(selectedCompany);
  };

  return (
    <>
      <Card className="py-7">
        <CardHeader>
          <CardTitle>Pilih Perusahaan</CardTitle>
          <CardDescription>
            Silakan pilih perusahaan yang ingin Anda akses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CompanySelect organizations={organizations} />
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" className="cursor-pointer">
            Buat Perusahaan Baru
          </Button>
          <Button
            className="cursor-pointer"
            disabled={!selectedCompany || setActiveOrgMutation.isPending}
            onClick={handleContinue}
          >
            {setActiveOrgMutation.isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner />
                <p>Loading...</p>
              </div>
            ) : (
              "Lanjutkan"
            )}
          </Button>
        </CardFooter>
      </Card>

      <p className="text-sm text-center text-gray-500 mt-4">
        Tidak menemukan perusahaan Anda? Hubungi dukungan kami
      </p>
    </>
  );
};
