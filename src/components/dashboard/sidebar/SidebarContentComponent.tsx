"use client";

import * as React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import { GalleryVerticalEnd } from "lucide-react";
import { NavMain } from "../nav-main";
import { NavUser } from "../nav-user";
import type { SidebarContentComponentProps } from "@/lib/sidebar";
import { sidebarData } from "./sidebarData";

const SidebarContentComponent: React.FC<SidebarContentComponentProps> =
  React.memo(({ dataActive, user }) => {
    return (
      <>
        <SidebarHeader>
          <TeamSwitcher
            name={dataActive?.name || ""}
            logo={GalleryVerticalEnd}
            plan="Perusahaan"
          />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={sidebarData.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </>
    );
  });

SidebarContentComponent.displayName = "SidebarContentComponent";

export default SidebarContentComponent;
