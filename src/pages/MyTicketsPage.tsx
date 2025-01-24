import { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { ticketService } from '../services/ticketService';
import { Ticket } from '../types/ticket';
import { useAuth } from '../contexts/AuthContext';

const MyTicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const allTickets = await ticketService.getTickets();
        // Filter tickets for the current user
        const userTickets = allTickets.filter(
          ticket => ticket.created_by === user?.email
        );
        setTickets(userTickets);
      } catch (err) {
        setError('Failed to fetch your tickets. Please try again later.');
        console.error('Error fetching tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [user?.email]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      
      {tickets.length === 0 ? (
        <Alert severity="info">You haven't submitted any tickets yet.</Alert>
      ) : (
        tickets.map((ticket) => (
          <Paper key={ticket.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {ticket.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Status: {ticket.status} | Priority: {ticket.priority}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Created: {new Date(ticket.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              {ticket.description}
            </Typography>
            {ticket.tags.length > 0 && (
              <Box mt={1}>
                <Typography variant="body2" color="text.secondary">
                  Tags: {ticket.tags.join(', ')}
                </Typography>
              </Box>
            )}
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyTicketsPage; 