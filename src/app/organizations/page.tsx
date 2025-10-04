"use client";

import Auth from "@/components/auth";
import { OrganizationCard } from "@/app/organizations/OrganizationCard";

const OrganizationPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex">
      <Auth />
      <div className="w-full max-w-md m-auto">
        <OrganizationCard />
      </div>
    </div>
  );
};

export default OrganizationPage;
