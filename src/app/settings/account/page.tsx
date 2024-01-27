import { Separator } from "@/components/ui/separator"

import { getUserProfile } from "@/app/settings/account/utils"
import AccountForm from "@/app/settings/account/account-form"

export default async function AccountSettings() {
  const profile = await getUserProfile()

  return (
    <div>
      <div>
        <h2 className="text-lg font-medium">Account Settings</h2>
        <p className="text-sm text-zinc-500">Update your account settings. Set your preferred language and timezone.</p>
      </div>
      <Separator className="my-4" />
      <div>
        <AccountForm profile={profile} />
      </div>
    </div>
  )
}
