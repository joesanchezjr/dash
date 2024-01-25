/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Rewrite all root pages that start with @ to show the profile page
        // This is needed so that we can properly throw 404 for both user pages and non-user pages
        // Examples:
        // - /@user -> /p/user (displays in browser as /@user)
        // - /this-page-does-not-exist -> 404 (displays in browser as /this-page-does-not-exist)
        // Reference: https://nextjs.org/docs/app/api-reference/next-config-js/rewrites#regex-path-matching
        source: "/:username(@[a-zA-Z0-9_]+)",
        destination: "/p/:username",
      },
    ]
  },
}

export default nextConfig
