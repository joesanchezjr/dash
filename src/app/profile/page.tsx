import { cookies } from "next/headers"

import { createClient } from "@/utils/supabase/server"

export default async function EditProfilePage() {
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

  return (
    <main className="container">
      <h1>Edit Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </main>
  )
}
