"use client";

import * as React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import type { SidebarContentComponentProps } from "@/lib/sidebar";
import { sidebarData } from "./sidebarData";
import { TeamSwitcher } from "../TeamSwitcher";
import { NavMain } from "../NavMain";
import { NavUser } from "../NavUser";

const SidebarContentComponent: React.FC<SidebarContentComponentProps> =
  React.memo(({ dataActive, user }) => {
    const [activeButton, setActiveButton] = React.useState("ERP");
    return (
      <>
        <SidebarHeader>
          <TeamSwitcher
            name={dataActive?.name || ""}
            logo={GalleryVerticalEnd}
            plan="Perusahaan"
          />
          <div className="md:flex items-center hidden gap-4 bg-gray-100 border border-gray-200 rounded-md p-1 mt-2">
            <button
              onClick={() => setActiveButton("ERP")}
              className={`text-[12px] w-1/2 py-[2px] font-medium cursor-pointer  ${
                activeButton === "ERP"
                  ? "bg-white border rounded-md shadow-sm"
                  : "text-gray-400"
              }`}
            >
              ERP
            </button>
            <button
              onClick={() => setActiveButton("Work")}
              className={`text-[12px] w-1/2 py-[2px] font-medium cursor-pointer ${
                activeButton === "Work"
                  ? "bg-white border rounded-md shadow-sm"
                  : "text-gray-400"
              }`}
            >
              Workspace
            </button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {activeButton === "ERP" && <NavMain items={sidebarData.navMain} />}
          {activeButton === "Work" && (
            <div className="p-4 text-sm text-gray-500">Segera Datang...</div>
          )}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </>
    );
  });

SidebarContentComponent.displayName = "SidebarContentComponent";

export default SidebarContentComponent;
