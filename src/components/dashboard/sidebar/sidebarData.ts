import {
  Sparkles,
  Users,
  Wallet,
  Database,
  Boxes,
  FileBarChart2,
  Settings,
  SquareTerminal,
  PackageCheck,
  HardDriveUpload,
  HardDriveDownload,
  Computer,
  Contact,
} from "lucide-react";
import type { SidebarData } from "@/lib/sidebar";

export const sidebarData: SidebarData = {
  user: {
    name: "error",
    email: "error@error.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: SquareTerminal },
    { title: "Tanya AI", url: "#", icon: Sparkles },
    { title: "Produk", url: "#", icon: PackageCheck },
    {
      title: "Kontak",
      url: "#",
      icon: Users,
      items: [{ title: "Semua Kontak", url: "#" }],
    },
    { title: "Penjualan", url: "#", icon: HardDriveUpload },
    { title: "Pembelian", url: "#", icon: HardDriveDownload },
    {
      title: "Keuangan",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Kas & Bank", url: "#" },
        { title: "Jurnal", url: "#" },
      ],
    },
    {
      title: "Kasir",
      url: "#",
      icon: Computer,
      items: [{ title: "POS", url: "#" }],
    },
    {
      title: "Data Master",
      url: "#",
      icon: Database,
      items: [{ title: "Satuan", url: "#" }],
    },
    {
      title: "Persediaan",
      url: "#",
      icon: Boxes,
      items: [{ title: "Stok", url: "#" }],
    },
    {
      title: "CRM",
      url: "#",
      icon: Contact,
      items: [{ title: "Leads", url: "#" }],
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileBarChart2,
      items: [{ title: "Semua Laporan", url: "#" }],
    },
    { title: "Pengaturan", url: "#", icon: Settings },
  ],
};
