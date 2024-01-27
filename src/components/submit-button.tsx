"use client"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SubmitButton({ children }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="min-w-20">
      {pending ? <Loader2 className="animate-spin" /> : children ?? "Submit"}
    </Button>
  )
}
