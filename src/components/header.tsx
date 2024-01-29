import Link from "next/link"

import { AuthButton } from "@/components/auth-button"
import { ModeToggle } from "@/components/mode-toggle"
import { Dash } from "@/components/icons/dash"
import { Button } from "@/components/ui/button"
import { getServerSession } from "@/utils/supabase/session"

export async function Header() {
  const session = await getServerSession()

  return (
    <header className="container flex items-center justify-between py-4">
      <nav className="flex items-center gap-4">
        <Link href="/" className="block">
          <Dash className="h-10 w-10" />
          <span className="sr-only">Home</span>
        </Link>
      </nav>
      <div className="flex gap-2">
        {session ? (
          <Button asChild variant="outline">
            <Link href="/settings/account">Settings</Link>
          </Button>
        ) : null}
        <AuthButton />
        <ModeToggle />
      </div>
    </header>
  )
}
