import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { createClient } from "@/utils/supabase/server"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SubmitButton } from "@/components/submit-button"
import { revalidatePath } from "next/cache"

async function getUserProfile(usernameFromParams: string) {
  const username = decodeURIComponent(usernameFromParams)
  const supabase = createClient(cookies())

  // check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?reason=not-authenticated")
  }

  /**
   * get the profile for the logged-in user
   * we're using the id instead of the username so that we don't request somebody else's profile
   */
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // if the profile doesn't exist for logged-in user, redirect to the create profile page
  if (!profile) {
    return redirect("/profile/create?reason=profile-does-not-exist")
  }

  // if the username in the url doesn't match the username in the profile, redirect to the profile page
  if (profile.username !== username) {
    return redirect(
      `/profile/${username}?reason=${profile.username}-does-not-have-permission-to-edit-profile-for-${username}`,
    )
  }

  return profile
}

export default async function EditProfilePage({ params }: { params: { username: string } }) {
  const profile = await getUserProfile(params.username)

  async function updateUser(formData: FormData) {
    "use server"

   
  }
  return (
    <main className="container py-12">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </CardHeader>
        <CardContent>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form action={updateUser} className="space-y-4">
            <div>
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                name="display_name"
                defaultValue={profile.display_name ?? undefined}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" defaultValue={profile.username ?? undefined} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                defaultValue={profile.website ?? undefined}
                placeholder="https://www.example.com"
                className="mt-1"
              />
            </div>
            <div>
              <div className="mt-8 flex justify-end gap-4">
                <Button type="button" asChild variant="secondary">
                  <Link href={`/profile/${profile.username}`}>Cancel</Link>
                </Button>
                <SubmitButton>Save</SubmitButton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
