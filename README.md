# AutoCRM

A modern customer relationship management system built with React, TypeScript, and Supabase.

## Features

- 🎫 Ticket Management System
  - Create and track support tickets
  - Priority levels and status tracking
  - Tag-based categorization
  - Internal notes for team collaboration
- 📝 Response Templates
  - Create and manage reusable response templates
  - Categorize templates for easy access
  - Quick insertion into ticket responses
  - Customize templates before sending

## Tech Stack

- Frontend: React + TypeScript
- UI Framework: Material-UI (MUI)
- Backend: Supabase
- Routing: React Router
- Build Tool: Vite

## Setup

1. Clone the repository
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Initialize the database by running the following SQL in your Supabase SQL editor:
   - Go to Supabase Dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "+" next to "Search queries" to create a new query
   - Copy and paste each SQL block below and run them separately:

   First, create the tickets table:
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

   Then, create the templates table:
   ```sql
   CREATE TABLE templates (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     category TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW(),
     created_by TEXT,
     is_shared BOOLEAN DEFAULT true
   );
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── tickets/      # Ticket-related components
│   └── templates/    # Template-related components
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

## Using the App

### Managing Tickets
- View all tickets on the home page
- Click a ticket to view details and respond
- Add internal notes and update ticket status

### Using Templates
1. Navigate to the Templates page
2. Create new templates with:
   - Title: A descriptive name
   - Content: The response text
   - Category: Optional grouping
3. Use templates when responding to tickets:
   - Click "Insert Template" in the ticket response
   - Select a template from the list
   - Customize the content if needed
   - Click "Insert" to add it to your response

## License

MIT License - See [LICENSE](LICENSE) for details
