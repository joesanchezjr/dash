import localFont from "next/font/local"

export const inter = localFont({
  src: [
    {
      path: "./Inter/InterVariable.woff2",
      style: "normal",
    },
    {
      path: "./Inter/InterVariable-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-inter",
})
