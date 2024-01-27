<div align="center">
  <a href="https://with-dash.vercel.app">
    <picture>
      <img src="https://with-dash.vercel.app/rabbit-running.svg" height="40">
    </picture>
  </a>
  <h1 align="center">Dash</h1>
</div>

An opinionated Next.js template built with TypeScript, Tailwind CSS, Supabase (Auth and Database), and ESLint.

## Requirements
### Environment Variables
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_ANON_KEY= # same as NEXT_PUBLIC version
SUPABASE_URL= # same as NEXT_PUBLIC version
SUPABASE_SERVICE_ROLE_KEY= #optional
```
> If deploying to Vercel, you can use the Supabase integration to automatically set these environment variables. You can then pull these locally using `npx vercel env pull .env`

> Note: If you want to have multiple Supabase environments, you'll need to add the variables individually in the Vercel dashboard.

### Setting up Auth

After creating a Supabase project, you'll need to also setup the Providers in the Auth section. This template currently has support for GitHub and Magic Link login.

### Setting up GitHub Actions
You'll need to add the following secrets to your GitHub repository:
```
SUPABASE_PROJECT_ID
SUPABASE_DB_PASSWORD
SUPABASE_ACCESS_TOKEN
```

### Setting up local Supabase
1. Install the Supabase CLI
2. Login to Supabase using `supabase login`
3. Link your project using `supabase link`
4. Run `supabase start` to start the local Supabase instance
5. Run `supabase db push` to push the database schema to the local instance
6. Run `supabase db stop` to stop the local instance

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.