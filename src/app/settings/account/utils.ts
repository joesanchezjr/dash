import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function getUserProfile() {
  const supabase = createClient(cookies());

  // check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login?reason=not-authenticated");
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq(
    "id",
    user.id,
  ).single();

  if (!profile) {
    return redirect("/profile/create?reason=profile-does-not-exist");
  }

  return profile;
}
