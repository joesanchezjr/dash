import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { Dash } from "@/components/icons/dash"

export function Header() {
  return (
    <header className="container flex items-center justify-between py-4">
      <nav className="flex items-center gap-4">
        <Link href="/" className="block">
          <Dash className="h-10 w-10" />
          <span className="sr-only">Home</span>
        </Link>
      </nav>
      <div>
        <ModeToggle />
      </div>
    </header>
  )
}
