import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username)

  const supabase = createClient(cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?reason=not-authenticated")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    return notFound()
  }

  if (profile.username !== username) {
    return redirect(`/profile/${username}?reason=user-does-not-have-permission-to-edit-profile-for-${username}`)
  }

  return (
    <main className="container">
      <h1>Edit Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </main>
  )
}
