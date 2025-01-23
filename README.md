# AutoCRM - Modern Customer Support System

A modern, scalable customer support system built with React and Supabase.

## Features

- Ticket Management System
- Customer Portal
- Team Management
- Real-time Updates
- API-First Design

## Tech Stack

- Frontend: React with TypeScript
- UI Framework: Material-UI
- Backend: Supabase
- State Management: React Context + Supabase Realtime
- Routing: React Router
- Authentication: Supabase Auth

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- npm (v9.6.7 or higher)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd autocrm
```

2. Install dependencies
```bash
npm install
```

3. Create a Supabase project and add the credentials to `.env.local`
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/     # Reusable components
  │   ├── layout/    # Layout components
  │   ├── tickets/   # Ticket-related components
  │   └── auth/      # Authentication components
  ├── pages/         # Page components
  ├── services/      # API and service functions
  ├── utils/         # Utility functions
  ├── types/         # TypeScript type definitions
  └── hooks/         # Custom React hooks
```

## Contributing

[Contribution guidelines]

## License

[License information]
