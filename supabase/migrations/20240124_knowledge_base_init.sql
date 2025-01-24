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

-- Create functions for tracking
create or replace function increment_article_views(article_id uuid)
returns void as $$
begin
  update public.knowledge_base_articles
  set views_count = views_count + 1
  where id = article_id;
end;
$$ language plpgsql security definer;

create or replace function increment_article_helpful(article_id uuid)
returns void as $$
begin
  update public.knowledge_base_articles
  set helpful_count = helpful_count + 1
  where id = article_id;
end;
$$ language plpgsql security definer;

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