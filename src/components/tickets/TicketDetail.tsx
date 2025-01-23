import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  TextField,
  Button,
  Divider
} from '@mui/material';
import { Ticket } from '../../types/ticket';
import { ticketService } from '../../services/ticketService';
import { TemplateSelector } from '../templates/TemplateSelector';

export const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const loadTicket = async () => {
      if (!id) return;
      try {
        const data = await ticketService.getTicketById(id);
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ticket');
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleTemplateSelect = (content: string) => {
    setResponse(content);
  };

  const handleSubmitResponse = async () => {
    if (!ticket || !response.trim()) return;

    try {
      await ticketService.updateTicket(ticket.id, {
        status: 'in_progress',
        internal_notes: ticket.internal_notes
          ? `${ticket.internal_notes}\n\nResponse: ${response}`
          : `Response: ${response}`,
      });

      // Clear response after sending
      setResponse('');
      
      // Reload ticket to show updated notes
      const updatedTicket = await ticketService.getTicketById(ticket.id);
      setTicket(updatedTicket);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response');
    }
  };

  if (loading) return <Box>Loading ticket...</Box>;
  if (error) return <Box color="error.main">{error}</Box>;
  if (!ticket) return <Box>Ticket not found</Box>;

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {ticket.title}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {ticket.description}
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={ticket.status}
              color={
                ticket.status === 'open'
                  ? 'error'
                  : ticket.status === 'in_progress'
                  ? 'warning'
                  : 'success'
              }
              size="small"
            />
            <Chip
              label={ticket.priority}
              color={
                ticket.priority === 'urgent'
                  ? 'error'
                  : ticket.priority === 'high'
                  ? 'warning'
                  : 'default'
              }
              size="small"
            />
            {ticket.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          {ticket.internal_notes && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Internal Notes:
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ whiteSpace: 'pre-wrap' }}
              >
                {ticket.internal_notes}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add Response
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            </Stack>
            <TextField
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response..."
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSubmitResponse}
              disabled={!response.trim()}
            >
              Submit Response
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}; 