"use server"
import "server-only"

import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const schema = z.object({
  display_name: z
    .string({
      invalid_type_error: "Invalid display name",
    })
    .max(32, {
      message: "Display name should be less than 32 characters long",
    })
    .optional()
    .or(z.literal("")),
  username: z
    .string({
      invalid_type_error: "Invalid username",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain alphanumeric characters and underscores",
    })
    .max(16, {
      message: "Username can be at most 16 characters long",
    })
    .optional()
    .or(z.literal("")),
  website: z
    .string({
      invalid_type_error: "Invalid website",
    })
    .optional()
    .or(z.literal("")),
})

interface UpdateUserState {
  success?: true
  errors?: {
    formErrors?: string[]
    fieldErrors?: {
      display_name?: string[]
      username?: string[]
      website?: string[]
    }
  } | null
}

export async function updateUser(prevState: UpdateUserState, formData: FormData): Promise<UpdateUserState> {
  const validatedFields = schema.safeParse({
    display_name: formData.get("display_name"),
    username: formData.get("username"),
    website: formData.get("website"),
  })

  if (!validatedFields.success) {
    return {
      errors: {
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      },
    }
  }

  const profile_data = validatedFields.data

  for (const [key, value] of Object.entries(profile_data)) {
    if (!value || (typeof value === "string" && value.length === 0)) {
      // @ts-expect-error null actually is a valid value in the database
      profile_data[key as keyof typeof profile_data] = null
    }
  }

  const supabase = createClient(cookies())
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login?reason=not-authenticated")
  }

  const { data: current_profile } =
    (await supabase.from("profiles").select("*").eq("id", user.id).select().single()) || {}

  const customFieldErrors = {}

  // cannot remove previously set values or required values
  for (const [key, value] of Object.entries(current_profile || {})) {
    if (!profile_data[key as keyof typeof profile_data] && !!value) {
      if (key === "display_name") {
        Object.assign(customFieldErrors, {
          ["display_name"]: ["Display name cannot be empty"],
        })
      }
      if (key === "username") {
        Object.assign(customFieldErrors, {
          ["username"]: ["Username cannot be empty"],
        })
      }
    }
  }

  if (Object.keys(customFieldErrors).length > 0) {
    return {
      errors: {
        fieldErrors: customFieldErrors,
      },
    }
  }

  // remove keys that match current profile
  for (const [key, value] of Object.entries(current_profile || {})) {
    if (profile_data[key as keyof typeof profile_data] === value) {
      delete profile_data[key as keyof typeof profile_data]
    }
  }

  if (Object.keys(profile_data).length === 0) {
    return {}
  }

  const { error } = await supabase
    .from("profiles")
    .update({ ...profile_data, updated_at: new Date().toISOString() })
    .eq("id", user.id)

  if (error) {
    // @todo: improve this
    switch (error.code) {
      case "23505":
        return {
          errors: {
            fieldErrors: {
              username: ["Username already exists"],
            },
          },
        }
      default:
        return {
          errors: {
            formErrors: ["An unknown error occurred while updating your profile"],
          },
        }
    }
  }

  revalidatePath("/settings/account")
  return { success: true }
}
