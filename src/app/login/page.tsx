import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Card, CardContent } from "@/components/ui/card"

import AuthUI from "./auth-ui"

export default async function LoginPage() {
  const supabase = createClient(cookies())

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return redirect("/")
  }

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-md">
        <Card>
          <CardContent className="pt-3">
            <AuthUI />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
