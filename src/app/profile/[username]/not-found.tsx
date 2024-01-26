import Link from "next/link"

export default function NotFound() {
  return (
    <main className="container">
      <h1>User not found</h1>
      <p>The profile you are looking for does not exist</p>
      <Link href="/">Return Home</Link>
    </main>
  )
}
