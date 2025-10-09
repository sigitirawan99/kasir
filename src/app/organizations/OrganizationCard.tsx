"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useOrganizationStore } from "../../components/organization/useOrganizationStore";
import { CompanySelect } from "../../components/organization/CompanySelect";
import { Organization } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";

export const OrganizationCard = () => {
  const { selectedCompany } = useOrganizationStore();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleContinue = async () => {
    if (!selectedCompany) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/auth/organization/set-active",
        { organizationId: selectedCompany },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await api.get("/auth/organization/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrganizations(res.data);
      } catch (err) {
        console.error("Gagal mengambil daftar organisasi:", err);
      }
    };
    fetchOrganizations();
  }, [token]);

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
            disabled={!selectedCompany || loading}
            onClick={handleContinue}
          >
            {loading ? (
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
