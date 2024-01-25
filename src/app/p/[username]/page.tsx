import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

// validate a string matches the pattern "@username"
function isValidUsername(username: string) {
  // valid characters are a-z, A-Z, 0-9, and _
  return /^@[a-zA-Z0-9_]+$/.test(username)
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const decodedUsername = decodeURIComponent(params.username)

  if (!isValidUsername(decodedUsername)) {
    // this should throw a regular 404
    return notFound()
  }

  // username is guaranteed to be valid at this point
  const username = decodedUsername.slice(1)

  const supabase = createClient(cookies())
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) {
    // this should throw a profile not found 404
    return notFound()
  }

  return (
    <main className="container">
      <h1>Public Profile</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </main>
  )
}
