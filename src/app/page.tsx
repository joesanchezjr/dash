import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="container py-16">
      <h1 className="text-4xl md:text-4xl">
        Build something beautiful &mdash;{" "}
        <span className="inline-block">
          with <span className="font-bold text-indigo-500">Dash</span>
        </span>
      </h1>
      <p className="mt-12 text-2xl leading-10">
        An opinionated{" "}
        <Button asChild variant="outline" className="align-middle">
          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
            Next.js
          </a>
        </Button>{" "}
        template with{" "}
        <Button asChild variant="outline" className="align-middle">
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
            TailwindCSS
          </a>
        </Button>{" "}
        and{" "}
        <Button asChild variant="outline" className="align-middle">
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            TypeScript
          </a>
        </Button>{" "}
        support.
      </p>
    </main>
  )
}
