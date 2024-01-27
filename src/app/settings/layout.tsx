import SettingsNavigation from "@/app/settings/navigation"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-zinc-500">Manage your settings.</p>
      </div>
      <Separator className="my-8" />
      <div className="grid grid-cols-6 gap-4">
        <div className="grid-cols-1">
          <SettingsNavigation />
        </div>
        <div className="col-span-5 px-4">
          {children}
          <Toaster />
        </div>
      </div>
    </main>
  )
}
