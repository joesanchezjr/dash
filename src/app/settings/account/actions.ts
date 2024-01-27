"use server";
import "server-only";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const schema = z.object({
  display_name: z.string({
    invalid_type_error: "Invalid Display Name",
  }).max(32, {
    message: "Display name should be less than 32 characters long",
  }).optional().or(z.literal("")),
  username: z.string({
    invalid_type_error: "Invalid Username",
  }).min(3, {
    message: "Username must be at least 3 characters long",
  }).optional().or(z.literal("")),
  website: z.string({}).url({ message: "Website must be a valid URL" })
    .optional().or(z.literal("")),
});

interface UpdateUserState {
  success?: true;
  errors?: {
    formErrors?: string[];
    fieldErrors?: {
      display_name?: string[];
      username?: string[];
      website?: string[];
    };
  } | null;
}

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData,
): Promise<UpdateUserState> {
  const validatedFields = schema.safeParse({
    display_name: formData.get("display_name"),
    username: formData.get("username"),
    website: formData.get("website"),
  });

  if (!validatedFields.success) {
    return {
      errors: {
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      },
    };
  }

  const profile_data = validatedFields.data;

  for (const [key, value] of Object.entries(profile_data)) {
    if (!value) {
      delete profile_data[key as keyof typeof profile_data];
    }
    if (typeof value === "string" && value.length === 0) {
      delete profile_data[key as keyof typeof profile_data];
    }
  }

  const supabase = createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login?reason=not-authenticated");
  }

  const { error } = await supabase.from("profiles").update(profile_data).eq(
    "id",
    user.id,
  );

  if (error) {
    return {
      errors: {
        formErrors: ["An unknown error occurred while updating your profile"],
      },
    };
  }
  revalidatePath("/settings/account");

  return { success: true };
}
