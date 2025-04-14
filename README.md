# PokemonIRL - Personal Growth Journey

A web application inspired by Pokémon's gym badge system, but focused on personal growth and becoming your best self. Complete real-life challenges to earn badges in various areas of personal development.

## Features

- **8 Growth Badges**: Complete challenges in areas like Stillness, Charity, Virtue, and more
- **Progressive Challenges**: Each badge has multiple challenges that build on each other:
  - Study (learn about a concept)
  - Reflect (journal on the concept)
  - Roleplay (practice in a controlled setting)
  - Apply (implement in real life)
  - Final Boss (master the concept through consistent habits)
- **Progress Tracking**: Monitor your growth journey with visual progress indicators
- **Google Authentication**: Secure and simple login

## Tech Stack

- **Frontend**: Next.js + React + Tailwind CSS + ShadCN UI
- **Backend/DB**: Supabase (PostgreSQL)
- **Authentication**: Google Sign-In via Supabase Auth
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Database Structure

The application uses the following tables in Supabase:

- `profiles`: User profiles
- `badges`: Badge definitions
- `badge_progress`: User progress for each badge
- `challenges`: Challenge definitions for each badge
- `challenge_progress`: User progress for individual challenges

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!
