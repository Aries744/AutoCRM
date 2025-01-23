import { Container, Typography } from '@mui/material';
import { TicketList } from '../components/tickets/TicketList';

export const TicketsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Support Tickets
      </Typography>
      <TicketList />
    </Container>
  );
}; 