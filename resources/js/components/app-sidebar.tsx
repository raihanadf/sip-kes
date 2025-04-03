import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"
import type { NavGroup, NavItem } from "@/types"
import { Link } from "@inertiajs/react"
import { Ambulance, Bed, Building, CircleUser, ClipboardList, ClipboardPlus, Contrast, FileCheck, FileSignature, FileText, History, LayoutGrid, Pill, Receipt, RectangleEllipsis, Settings, Stethoscope, UserPlus, Users, } from "lucide-react"
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
  {
    title: "Dokter",
    href: "/dokter",
    icon: Stethoscope,
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
        title: "General Consent",
        href: "/persuratan/rujukan",
        icon: FileCheck,
      },
      {
        title: "Informed Consent",
        href: "/persuratan/rujukan",
        icon: FileText,
      },
      {
        title: "SK Sehat",
        href: "/persuratan/keterangan",
        icon: FileText,
      },
      {
        title: "SK Sakit",
        href: "/persuratan/keterangan",
        icon: FileText,
      },
      {
        title: "Surat Kontrol",
        href: "/persuratan/keterangan",
        icon: FileText,
      },
      {
        title: "Surat Rujukan RI",
        href: "/persuratan/keterangan",
        icon: FileText,
      },
      {
        title: "Surat Kematian",
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
        href: "/settings/profil-klinik",
        icon: Building,
      },
      {
        title: "Profil",
        href: "/settings/profile",
        icon: Users,
      },
      {
        title: "Password",
        href: "/settings/password",
        icon: RectangleEllipsis,
      },
      {
        title: "Tampilan",
        href: "/settings/appearance",
        icon: Contrast,
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

