"use client"

import React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/submit-button"

import { updateUser } from "@/app/settings/account/actions"
import { useFormState } from "react-dom"

import { toast } from "sonner"
import { useHydrated } from "@/hooks/use-hydrated"

function ErrorList({ errors, id }: { errors?: string[] | null; id?: string }) {
  return errors?.length ? (
    <ul id={id} className="mt-1.5 flex flex-col gap-1">
      {errors.map((error, i) => (
        <li key={i} className="text-sm text-red-500">
          {error}
        </li>
      ))}
    </ul>
  ) : null
}

export default function AccountForm({
  profile,
}: {
  profile: Awaited<ReturnType<typeof import("./utils").getUserProfile>>
}) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState(updateUser, { errors: null })
  const isHydrated = useHydrated()

  const hasDisplayNameError = !!state?.errors?.fieldErrors?.display_name?.length
  const hasUsernameError = !!state?.errors?.fieldErrors?.username?.length
  const hasWebsiteError = !!state?.errors?.fieldErrors?.website?.length
  const hasFormError = !!state?.errors?.formErrors?.length

  React.useEffect(() => {
    if (state?.success) {
      toast.success("Account updated!")
    }
  }, [state?.success])

  React.useEffect(() => {
    const formEl = formRef.current
    if (!formEl) {
      return
    }

    if (Object.values(state?.errors || {}).length === 0) {
      return
    }

    if (formEl.matches('[aria-invalid="true"]')) {
      formEl.focus()
    } else {
      const firstInvalid = formEl.querySelector('[aria-invalid="true"]')
      if (firstInvalid instanceof HTMLElement) {
        firstInvalid.focus()
      }
    }
  }, [state?.errors])

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, jsx-a11y/role-supports-aria-props
    <form
      id="account-form"
      action={formAction}
      className="space-y-4"
      aria-invalid={hasFormError || undefined}
      aria-describedby={hasFormError ? "form-errors" : undefined}
      noValidate={isHydrated}
      ref={formRef}
      tabIndex={-1}
    >
      <div>
        <div>
          <Label htmlFor="display_name">Name</Label>
          <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-600" id="display_name-hint">
            32 characters max
          </span>
        </div>
        <Input
          id="display_name"
          name="display_name"
          defaultValue={profile.display_name ?? undefined}
          className="mt-1"
          maxLength={32}
          aria-describedby={hasDisplayNameError ? "display_name-errors display_name-hint" : "display_name-hint"}
          aria-invalid={hasDisplayNameError || undefined}
        />
        <ErrorList id="display_name-errors" errors={state?.errors?.fieldErrors?.display_name} />
      </div>
      <div>
        <div>
          <Label htmlFor="username">Username</Label>
          <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-600" id="username-hint">
            16 characters max
          </span>
        </div>
        <Input
          id="username"
          name="username"
          defaultValue={profile.username ?? undefined}
          className="mt-1"
          aria-describedby={hasUsernameError ? "username-errors username-hint" : "username-hint"}
          aria-invalid={hasUsernameError || undefined}
          autoComplete="off"
        />
        <ErrorList id="username-errors" errors={state?.errors?.fieldErrors?.username} />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          defaultValue={profile.website ?? undefined}
          placeholder="https://www.example.com"
          className="mt-1"
          aria-describedby={hasWebsiteError ? "website-errors" : undefined}
          aria-invalid={hasWebsiteError || undefined}
        />
        <ErrorList id="website-error" errors={state?.errors?.fieldErrors?.website} />
      </div>
      <ErrorList id="form-errors" errors={state?.errors?.formErrors} />
      <div>
        <div className="mt-8 flex justify-end gap-4">
          <SubmitButton>Update</SubmitButton>
        </div>
      </div>
    </form>
  )
}
