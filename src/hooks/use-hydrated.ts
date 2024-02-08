import { useEffect, useState } from "react"

/**
 * Custom hook to check if the code has been hydrated (aka running on the client side/browser).
 * @example
 * Helpful for progressive enhancement
 * The below example shows how to use the `useHydrated` hook to conditionally add the `noValidate` attribute to a form.
 * This would be useful if you want to use the browser's built-in form validation when the page is first loaded, but then disable it once the JavaScript has loaded.
 * 
 * ```jsx
 * const hydrated = useHydrated();
 * return (
 *   <form noValidate={hydrated}>
 *    <input type="text" required />
 *   </form>
 * )
 * ```
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
