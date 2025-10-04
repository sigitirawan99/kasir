// types/sidebar.ts
import { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
  isActive?: boolean;
  badge?: string | number;
}

export interface NavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
  badge?: string | number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

export interface DataActive {
  id?: string;
  name: string;
  plan?: string;
  logo?: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  plan?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SessionResponse {
  user: User;
  token?: string;
  expiresAt?: string;
}

export interface SidebarData {
  user: User;
  navMain: NavItem[];
}

export interface SidebarContentComponentProps {
  dataActive?: DataActive;
  user: User;
}

export interface MobileSidebarProps {
  dataActive?: DataActive;
  user: User;
}

export interface UseSidebarDataReturn {
  dataActive: DataActive | undefined;
  user: User;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
