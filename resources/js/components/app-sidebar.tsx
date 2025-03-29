import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { NavItem, NavGroup } from "@/types"
import { Link } from "@inertiajs/react"
import {
  ClipboardPlus,
  LayoutGrid,
  Stethoscope,
  Pill,
  Receipt,
  FileText,
  Settings,
  UserPlus,
  CircleUser,
  Bed,
  Ambulance,
  FileCheck,
  FileSignature,
  History,
  ClipboardList,
  Building,
  Users,
} from "lucide-react"
import AppLogo from "./app-logo"

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Farmasi",
    href: "/farmasi",
    icon: Pill,
  },
  {
    title: "Pembayaran",
    href: "/pembayaran",
    icon: Receipt,
  },
  {
    title: "Laporan",
    href: "/laporan",
    icon: FileText,
  },
]

const navGroups: NavGroup[] = [
  {
    title: "Pemeriksaan",
    icon: Stethoscope,
    items: [
      {
        title: "Umum",
        href: "/pemeriksaan/umum",
        icon: CircleUser,
      },
      {
        title: "KIA",
        href: "/pemeriksaan/kia",
        icon: Users,
      },
      {
        title: "Rawat Inap",
        href: "/pemeriksaan/rawat-inap",
        icon: Bed,
      },
      {
        title: "UGD",
        href: "/pemeriksaan/ugd",
        icon: Ambulance,
      },
    ],
  },
  {
    title: "Pendaftaran",
    icon: ClipboardPlus,
    items: [
      {
        title: "Pasien Baru",
        href: "/pendaftaran/baru",
        icon: UserPlus,
      },
      {
        title: "Pasien Lama",
        href: "/pendaftaran/lama",
        icon: CircleUser,
      },
    ],
  },
  {
    title: "Persuratan",
    icon: FileSignature,
    items: [
      {
        title: "Surat Rujukan",
        href: "/persuratan/rujukan",
        icon: FileCheck,
      },
      {
        title: "Surat Keterangan",
        href: "/persuratan/keterangan",
        icon: FileText,
      },
    ],
  },
  {
    title: "Rekam Medis",
    icon: ClipboardList,
    items: [
      {
        title: "Riwayat Pasien",
        href: "/rekam-medis/riwayat",
        icon: History,
      },
      {
        title: "Laporan Medis",
        href: "/rekam-medis/laporan",
        icon: FileText,
      },
    ],
  },
  {
    title: "Pengaturan",
    icon: Settings,
    items: [
      {
        title: "Profil Klinik",
        href: "/pengaturan/profil",
        icon: Building,
      },
      {
        title: "Something",
        href: "/something",
        icon: Users,
      },
    ],
  },
]

const footerNavItems: NavItem[] = []

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} groups={navGroups} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

