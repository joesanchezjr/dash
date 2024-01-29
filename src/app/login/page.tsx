import { redirect } from "next/navigation"

import AuthUI from "./auth-ui"
import { Card, CardContent } from "@/components/ui/card"
import { getServerSession } from "@/utils/supabase/session"

export default async function LoginPage() {
  if (await getServerSession()) {
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
