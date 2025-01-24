import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  created_at: string
  updated_at: string
  created_by: string
  assigned_to?: string
  tags: string[]
  internal_notes?: string
}

serve(async (req) => {
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the ticket data from the request
    const ticket: Ticket = await req.json()

    // Process the ticket (example: add an AI-generated tag based on content)
    const processedTicket = {
      ...ticket,
      tags: [
        ...ticket.tags,
        // Add a tag based on priority and status
        `${ticket.priority}-${ticket.status}`
      ]
    }

    // Update the ticket in the database
    const { data, error } = await supabaseClient
      .from('tickets')
      .update(processedTicket)
      .eq('id', ticket.id)
      .select()
      .single()

    if (error) throw error

    // Return the processed ticket
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
}) 