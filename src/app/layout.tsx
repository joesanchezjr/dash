import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"

import { inter } from "@/fonts"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    template: "%s | Dash",
    default: "Dash",
  },
  description: "Generated by create next app",
  icons: [
    { url: "/rabbit-running.ico", rel: "icon", sizes: "any" },
    { url: "/rabbit-running.svg", rel: "icon", type: "image/svg+xml" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
