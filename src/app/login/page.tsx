"use client"

import { getUrl } from "@/utils/misc"
import { createClient } from "@/utils/supabase/client"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export default function LoginPage() {
  const supabase = createClient()

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#6366f1",
                  brandAccent: "#6366f1",
                },
              },
            },
          }}
          providers={["github"]}
          view="magic_link"
          showLinks={false}
          redirectTo={`${getUrl()}/auth/callback`}
        />
      </div>
    </main>
  )
}
