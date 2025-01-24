import { supabase } from './supabase';
import { Ticket, CreateTicketDTO, TicketStatus } from '../types/ticket';

const TICKETS_TABLE = 'tickets';

export const ticketService = {
  async createTicket(data: CreateTicketDTO): Promise<Ticket> {
    const ticket = {
      ...data,
      status: 'open' as TicketStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: data.tags || [],
    };

    const { data: createdTicket, error } = await supabase
      .from(TICKETS_TABLE)
      .insert(ticket)
      .select()
      .single();

    if (error) throw error;

    // Process the ticket using the Edge Function
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-ticket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(createdTicket),
        }
      );

      if (!response.ok) {
        console.error('Edge Function error:', await response.text());
      }
    } catch (err) {
      console.error('Failed to process ticket:', err);
    }

    return createdTicket;
  },

  async getTickets(): Promise<Ticket[]> {
    const { data, error } = await supabase
      .from(TICKETS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from(TICKETS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    const { data, error } = await supabase
      .from(TICKETS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Process the updated ticket using the Edge Function
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-ticket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.error('Edge Function error:', await response.text());
      }
    } catch (err) {
      console.error('Failed to process ticket:', err);
    }

    return data;
  },
}; 