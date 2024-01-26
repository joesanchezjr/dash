"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

import { getUrl } from "@/utils/misc"
import { createClient } from "@/utils/supabase/client"

export default function AuthUI() {
  const supabase = createClient()

  return (
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
  )
}
