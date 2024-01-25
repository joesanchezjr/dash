import Link from "next/link"
import { cookies } from "next/headers"

import { Button } from "@/components/ui/button"

import { createClient } from "@/utils/supabase/server"

export async function ProfileButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    // this shouldn't really happen - every user should have a profile, even if the profile is blank
    return null
  }

  if (!profile.username) {
    return (
      <Button asChild variant="secondary">
        <Link href="/profile/create">Create Profile</Link>
      </Button>
    )
  }

  return (
    <>
      <Button asChild variant="secondary">
        <Link href={`/profile/${profile.username}`}>Visit Profile</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href={`/profile/${profile.username}/edit`}>Edit Profile</Link>
      </Button>
    </>
  )
}
