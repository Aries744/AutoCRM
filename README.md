# AutoCRM

A modern customer relationship management system built with React, TypeScript, and Supabase.

## Features

- 🎫 Ticket Management System
  - Create and track support tickets
  - Priority levels and status tracking
  - Tag-based categorization
  - Internal notes for team collaboration
  - Realistic placeholder data for development
- 📝 Response Templates
  - Create and manage reusable response templates
  - Categorize templates for easy access
  - Quick insertion into ticket responses
  - Customize templates before sending
  - Pre-built template examples
- 🔐 Authentication & Authorization
  - Secure email/password authentication
  - Protected routes and resources
  - Persistent sessions
  - User-specific views
  - Seamless login/signup experience
- 🌐 Customer Portal
  - User-friendly ticket submission interface
  - Priority selection with visual indicators
  - Dynamic tag management
  - Real-time form validation
  - Instant submission feedback
- 💅 Modern UI/UX
  - Responsive design for all devices
  - Mobile-friendly navigation
  - Consistent color scheme
  - Visual priority indicators
  - Modern typography and spacing

## Development Mode

The application currently runs in development mode with placeholder data:
- Sample support tickets with realistic scenarios
- Pre-built response templates for common situations
- Simulated timestamps and user interactions
- Supabase authentication integration

## Live Demo
Visit our live demo at [auto-crm-eight.vercel.app](https://auto-crm-eight.vercel.app)

## Tech Stack

- Frontend: React + TypeScript
- UI Framework: Material-UI (MUI)
- Backend: Supabase
- Authentication: Supabase Auth
- Routing: React Router
- Build Tool: Vite
- Deployment: Vercel

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Set up Supabase Authentication:
   - Go to your Supabase Dashboard
   - Navigate to Authentication > Providers
   - Enable Email provider
   - Configure any additional providers as needed

4. Initialize the database by running the following SQL in your Supabase SQL editor:
   ```sql
   -- Create the tickets table
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

   -- Create the templates table
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

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── tickets/      # Ticket-related components
│   └── templates/    # Template-related components
├── contexts/         # React contexts (Auth, etc.)
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

### Authentication
1. Visit the app and you'll be redirected to the auth page
2. Choose to either sign in or sign up
3. For sign up:
   - Enter your email
   - Create a password (min 6 characters)
   - Verify your email if required
4. For sign in:
   - Enter your registered email
   - Enter your password
5. Use the logout button in the top-right to sign out

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

### Submitting Tickets
1. Click "Submit Ticket" in the navigation bar or visit `/submit`
2. Fill in the ticket details:
   - Title: Brief summary of the issue
   - Description: Detailed explanation
   - Priority: Select from low to urgent
   - Tags: Add relevant categories (optional)
3. Submit the form and receive instant confirmation

## License

MIT License - See [LICENSE](LICENSE) for details
