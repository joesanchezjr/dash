"use client"
import React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ErrorEditProfilePage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="container py-12">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </CardHeader>
        <CardContent>
          <div>
            <h2>Something went wrong!</h2>
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
