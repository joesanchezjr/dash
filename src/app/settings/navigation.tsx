"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Account", href: "/settings/account" },
  // { name: "Profile", href: "/settings/profile" },
  // { name: "Security", href: "/settings/security" },
  // { name: "Billing", href: "/settings/billing" },
  // { name: "Notifications", href: "/settings/notifications" },
  // { name: "Integrations", href: "/settings/integrations" },
]

export default function SettingsNavigation({ className, ...props }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={className} {...props}>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Button asChild className="w-full justify-start" variant={pathname === item.href ? "secondary" : "ghost"}>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
