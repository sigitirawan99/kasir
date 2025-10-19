"use client";
import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Auth from "@/components/auth";
import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import MobileSidebar from "@/components/dashboard/sidebar/MobileSidebar";
import { useSidebarData } from "@/components/dashboard/sidebar/useSidebarData";
import ClientOnly from "@/components/ClientOnly";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { dataActive, user, isLoading } = useSidebarData();

  return (
    <SidebarProvider>
      <AppSidebar />
      <Auth />
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <ClientOnly>
            {!isLoading && (
              <MobileSidebar dataActive={dataActive} user={user} />
            )}
          </ClientOnly>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
