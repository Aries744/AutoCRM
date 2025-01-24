import { Ticket, CreateTicketDTO, TicketStatus } from '../types/ticket';

// Placeholder data for development
const PLACEHOLDER_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Unable to access cloud storage',
    description: 'Getting "Access Denied" error when trying to upload files to the cloud storage. This started happening after the recent system update.',
    status: 'open',
    priority: 'high',
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    created_by: 'john.doe@example.com',
    assigned_to: 'support.tech@gauntletai.com',
    tags: ['cloud-storage', 'access-control', 'urgent'],
    internal_notes: 'Checking ACL configurations and recent permission changes.'
  },
  {
    id: '2',
    title: 'Dashboard loading very slowly',
    description: 'The main dashboard takes more than 30 seconds to load. This is affecting our daily operations and reporting capabilities.',
    status: 'in_progress',
    priority: 'medium',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    created_by: 'sarah.smith@example.com',
    assigned_to: 'performance.team@gauntletai.com',
    tags: ['performance', 'dashboard', 'optimization'],
    internal_notes: 'Initial analysis shows high database query times. Optimization in progress.'
  },
  {
    id: '3',
    title: 'Need help with API integration',
    description: 'Looking for documentation and examples for integrating the payment processing API with our e-commerce platform.',
    status: 'open',
    priority: 'low',
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    created_by: 'dev.team@example.com',
    tags: ['api', 'integration', 'documentation'],
    internal_notes: 'Shared API documentation link and sample integration code.'
  },
  {
    id: '4',
    title: 'Account verification emails not being received',
    description: 'New users report they are not receiving account verification emails. SMTP logs show emails are being sent but not delivered.',
    status: 'resolved',
    priority: 'urgent',
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    created_by: 'user.support@example.com',
    assigned_to: 'email.admin@gauntletai.com',
    tags: ['email', 'verification', 'resolved'],
    internal_notes: 'Issue resolved - SPF records were incorrectly configured. Fixed and verified working.'
  },
  {
    id: '5',
    title: 'Feature Request: Dark Mode',
    description: 'Would love to see a dark mode option added to the platform. Many users work late hours and this would help reduce eye strain.',
    status: 'in_progress',
    priority: 'low',
    created_at: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    created_by: 'ux.team@example.com',
    assigned_to: 'dev.team@gauntletai.com',
    tags: ['feature-request', 'ui', 'enhancement'],
    internal_notes: 'Design mockups approved. Implementation scheduled for next sprint.'
  }
];

export const ticketService = {
  async createTicket(data: CreateTicketDTO): Promise<Ticket> {
    const ticket = {
      ...data,
      status: 'open' as TicketStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: data.tags || [],
    };

    try {
      // For development, return a mock response
      return {
        ...ticket,
        id: (Math.random() * 1000000).toString(),
        created_by: 'test.user@example.com',
      } as Ticket;

      // Uncomment for production
      /*
      const { data: createdTicket, error } = await supabase
        .from(TICKETS_TABLE)
        .insert(ticket)
        .select()
        .single();

      if (error) throw error;
      return createdTicket;
      */
    } catch (err) {
      console.error('Failed to create ticket:', err);
      throw err;
    }
  },

  async getTickets(): Promise<Ticket[]> {
    try {
      // For development, return placeholder data
      return PLACEHOLDER_TICKETS;

      // Uncomment for production
      /*
      const { data, error } = await supabase
        .from(TICKETS_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
      */
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      throw err;
    }
  },

  async getTicketById(id: string): Promise<Ticket | null> {
    try {
      // For development, return placeholder data
      const ticket = PLACEHOLDER_TICKETS.find(t => t.id === id);
      return ticket || null;

      // Uncomment for production
      /*
      const { data, error } = await supabase
        .from(TICKETS_TABLE)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
      */
    } catch (err) {
      console.error('Failed to fetch ticket:', err);
      throw err;
    }
  },

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    try {
      // For development, return mock response
      const ticket = PLACEHOLDER_TICKETS.find(t => t.id === id);
      if (!ticket) throw new Error('Ticket not found');
      
      return {
        ...ticket,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      // Uncomment for production
      /*
      const { data, error } = await supabase
        .from(TICKETS_TABLE)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
      */
    } catch (err) {
      console.error('Failed to update ticket:', err);
      throw err;
    }
  }
}; 