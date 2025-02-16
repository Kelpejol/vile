import { Home, FolderClosedIcon, LucideIcon, Bell, CreditCard, Settings } from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const MENU_ITEMS = (workspaceId: string): MenuItem[] => [
  {
    title: "Home",
    href: `/dashboard/${workspaceId}/home`,
    icon: Home,
  },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}`,
    icon: FolderClosedIcon,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: Bell,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: Settings,
  },
];
