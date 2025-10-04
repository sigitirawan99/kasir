import * as React from "react";
import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import SidebarContentComponent from "./SidebarContentComponent";
import { useSidebarData } from "./useSidebarData";

const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => {
  const { dataActive, user } = useSidebarData();

  return (
    <>
      <Sidebar collapsible="icon" className="hidden md:flex" {...props}>
        <SidebarContentComponent dataActive={dataActive} user={user} />
        <SidebarRail />
      </Sidebar>
    </>
  );
};

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
