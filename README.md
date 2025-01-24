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

5. Run the knowledge base migration from `supabase/migrations/20240124_knowledge_base_init.sql` to set up the knowledge base with sample articles.

6. Start the development server:
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

## Knowledge Base

The Knowledge Base system provides a self-service platform for users to find answers to common questions and learn about the system.

### Features

- **Article Management**
  - Staff members can create, edit, and delete articles
  - Articles support categories: general, account, billing, technical, features
  - Articles can have multiple tags for better organization
  - Articles have draft, published, and archived states
  - Automatic slug generation for SEO-friendly URLs

- **Access Control**
  - Public users can only view published articles
  - Staff members (@gauntletai.com) can view and manage all articles
  - Protected routes for article management

- **User Engagement**
  - View count tracking for articles
  - "Helpful" feedback system
  - Category-based filtering
  - Tag-based organization

- **Sample Content**
  - Staff members can initialize sample articles
  - Pre-written content covering common topics
  - Covers all available categories

### Database Schema

```sql
-- Create the knowledge base articles table
create table public.knowledge_base_articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  category text not null,
  status text not null,
  slug text not null unique,
  author_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views_count integer default 0,
  helpful_count integer default 0,
  tags text[] default array[]::text[]
);

-- Insert initial sample articles
INSERT INTO public.knowledge_base_articles 
(title, content, category, status, slug, tags, views_count, helpful_count)
VALUES
(
  'Welcome to AutoCRM',
  'Welcome to AutoCRM! This guide will help you get started with our customer support system.

Key Features:
- Submit and track support tickets
- Access our knowledge base
- Get real-time updates on your requests
- Communicate with our support team

To get started, simply log in to your account and navigate to the "Submit Ticket" page.',
  'general',
  'published',
  'welcome-to-autocrm',
  ARRAY['getting started', 'guide'],
  5,
  2
),
(
  'How to Submit Your First Ticket',
  'Follow these simple steps to submit your first support ticket:

1. Click "Submit Ticket" in the navigation menu
2. Fill in a clear title describing your issue
3. Provide detailed information in the description
4. Select the appropriate priority level
5. Add relevant tags if needed
6. Click Submit

Tips for effective tickets:
- Be specific about your issue
- Include any error messages you see
- Describe what you''ve already tried
- Add screenshots if helpful',
  'technical',
  'published',
  'how-to-submit-ticket',
  ARRAY['tickets', 'help', 'getting started'],
  10,
  4
),
(
  'Understanding Priority Levels',
  'AutoCRM uses four priority levels for tickets:

1. Urgent
   - Critical system failures
   - Complete service outages
   - Security incidents

2. High
   - Major functionality issues
   - Significant business impact
   - Time-sensitive problems

3. Medium
   - Non-critical bugs
   - Feature requests
   - Configuration issues

4. Low
   - General questions
   - Minor improvements
   - Documentation updates

Choose the appropriate priority level to ensure proper handling of your request.',
  'general',
  'published',
  'understanding-priority-levels',
  ARRAY['priority', 'guide', 'tickets'],
  8,
  3
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
alter table public.knowledge_base_articles enable row level security;

-- Anyone can read published articles
create policy "Anyone can read published articles"
  on public.knowledge_base_articles for select
  using (status = 'published');

-- Staff can read all articles
create policy "Staff can read all articles"
  on public.knowledge_base_articles for select
  using (auth.jwt() ->> 'email' like '%@gauntletai.com');

-- Only staff can insert/update/delete
create policy "Staff can manage articles"
  on public.knowledge_base_articles for all
  using (auth.jwt() ->> 'email' like '%@gauntletai.com');
```

### Usage

1. **Viewing Articles**
   - Navigate to the Knowledge Base section
   - Browse articles by category
   - Use tags to find related content
   - Provide feedback on helpful articles

2. **Managing Articles (Staff Only)**
   - Click "New Article" to create content
   - Use the article editor to write and format content
   - Add relevant tags and select a category
   - Choose article status (draft/published/archived)
   - Initialize sample content with "Add Sample Articles"

3. **Article States**
   - Draft: Work in progress, only visible to staff
   - Published: Visible to all users
   - Archived: Hidden from regular view

### Components

- `KnowledgeBasePage`: Main container and routing
- `ArticlesList`: Displays article grid with filtering
- `ArticleView`: Individual article display with feedback
- `ArticleEditor`: Create/edit interface for staff

### Future Improvements

1. Rich text editor for article content
2. Search functionality
3. Article relationships (related articles)
4. Version history
5. Comment system
6. Export/import capabilities

### Database Functions

```sql
-- Increment article view count
create or replace function increment_article_views(article_id uuid)
returns void as $$
begin
  update public.knowledge_base_articles
  set views_count = views_count + 1
  where id = article_id;
end;
$$ language plpgsql security definer;

-- Increment article helpful count
create or replace function increment_article_helpful(article_id uuid)
returns void as $$
begin
  update public.knowledge_base_articles
  set helpful_count = helpful_count + 1
  where id = article_id;
end;
$$ language plpgsql security definer;
```

These functions are used to track article engagement:
- `increment_article_views`: Automatically increments the view counter when an article is opened
- `increment_article_helpful`: Increments the helpful counter when a user clicks the helpful button

Both functions use `security definer` to ensure they can modify the data regardless of RLS policies.

### Environment Setup

1. Create the database table and functions using the SQL provided above
2. Ensure Supabase environment variables are set:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Staff emails should end with @gauntletai.com for proper access control
