# AutoCRM

A modern customer relationship management system built with React, TypeScript, and Supabase.

## Features

- 🎫 Ticket Management System
  - Create and track support tickets
  - Priority levels and status tracking
  - Tag-based categorization
  - Internal notes for team collaboration

## Tech Stack

- Frontend: React + TypeScript
- UI Framework: Material-UI (MUI)
- Backend: Supabase
- Routing: React Router
- Build Tool: Vite

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Initialize the database by running the following SQL in your Supabase SQL editor:
   ```sql
   CREATE TABLE tickets (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
     priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW(),
     created_by TEXT,
     assigned_to TEXT,
     tags TEXT[] DEFAULT '{}',
     internal_notes TEXT
   );
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── tickets/      # Ticket-related components
├── pages/            # Page components
├── services/         # API and external service integrations
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and configurations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

MIT License - See [LICENSE](LICENSE) for details
