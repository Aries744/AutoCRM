export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
  created_by: string;
  assigned_to?: string;
  tags: string[];
  internal_notes?: string;
}

export interface CreateTicketDTO {
  title: string;
  description: string;
  priority: TicketPriority;
  tags?: string[];
} 