export function getUrl() {
  let url =
    process.env.NODE_ENV === "production"
      ? "https://with-dash.vercel.app/"
      : process?.env?.NEXT_PUBLIC_VERCEL_BRANCH_URL ?? "http://localhost:3000/" // Automatically set by Vercel.
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  return url
}
