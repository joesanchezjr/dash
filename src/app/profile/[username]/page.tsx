import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { CircleUser } from "lucide-react"

import { createClient } from "@/utils/supabase/server"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username)

  const supabase = createClient(cookies())
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single()

  if (!profile) {
    // this should throw a profile not found 404
    return notFound()
  }

  return (
    <main className="container py-12">
      <Card>
        <CardHeader className="relative">
          <CardTitle>{profile.display_name || profile.username}</CardTitle>
          <CardDescription>@{profile.username}</CardDescription>
          <Avatar className="absolute right-6 top-6 !mt-0 h-12 w-12">
            <AvatarImage src={profile.avatar_url ?? undefined} />
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sagittis risus. Quisque at risus orci.
            Vivamus tempor rhoncus tristique. Aenean ac mi ornare, venenatis leo nec, consequat augue. Fusce ac porta
            purus, a consectetur dolor. Sed a vestibulum tortor. Phasellus sed orci at quam efficitur venenatis. Vivamus
            cursus enim vel lectus luctus, id porttitor enim pellentesque. Quisque in velit risus.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
