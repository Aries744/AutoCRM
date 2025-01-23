import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from '../../types/ticket';
import { ticketService } from '../../services/ticketService';
import { Box, Card, CardContent, Typography, Chip, Stack } from '@mui/material';

export const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await ticketService.getTickets();
        setTickets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) return <Box>Loading tickets...</Box>;
  if (error) return <Box color="error.main">{error}</Box>;

  return (
    <Stack spacing={2}>
      {tickets.map((ticket) => (
        <Card 
          key={ticket.id}
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          sx={{ 
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <CardContent>
            <Typography variant="h6">{ticket.title}</Typography>
            <Typography color="text.secondary" gutterBottom>
              {ticket.description}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip 
                label={ticket.status} 
                color={ticket.status === 'open' ? 'error' : 
                       ticket.status === 'in_progress' ? 'warning' : 
                       'success'} 
                size="small" 
              />
              <Chip 
                label={ticket.priority} 
                color={ticket.priority === 'urgent' ? 'error' : 
                       ticket.priority === 'high' ? 'warning' : 
                       'default'} 
                size="small" 
              />
              {ticket.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}; 