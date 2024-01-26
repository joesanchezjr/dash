import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function LoginLoading() {
  return (
    <main className="container py-16">
      <div className="mx-auto max-w-md">
        <Card>
          <CardContent className="flex min-h-64 items-center justify-center pt-3">
            <Loader2 className="animate-spin text-zinc-500" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
