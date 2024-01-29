import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function getServerSession() {
  const supabase = createClient(cookies())
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function protect(redirectTo = "/login?reason=not-authenticated") {
  const session = await getServerSession()
  if (!session) {
    return redirect(redirectTo)
  }
}

export async function signOut() {
  const supabase = createClient(cookies())
  await supabase.auth.signOut()
  return redirect("/login")
}
