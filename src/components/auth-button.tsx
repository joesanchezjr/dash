import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"

import { createClient } from "@/utils/supabase/server"

export async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  async function signOut() {
    "use server"

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect("/login")
  }

  return session ? (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form action={signOut}>
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
