import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getServerSession, signOut } from "@/utils/supabase/session"

export async function AuthButton() {
  const session = await getServerSession()

  async function signOutUser() {
    "use server"
    await signOut()
  }

  return session ? (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signOutUser}>
      <Button variant="outline" type="submit">
        Logout
      </Button>
    </form>
  ) : (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
