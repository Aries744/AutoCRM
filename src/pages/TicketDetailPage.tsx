import { Container, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TicketDetail } from '../components/tickets/TicketDetail';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

export const TicketDetailPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            component={RouterLink}
            to="/tickets"
            startIcon={<ArrowBackIcon />}
          >
            Back to Tickets
          </Button>
          <Typography variant="h4" component="h1">
            Ticket Details
          </Typography>
        </Stack>
        <TicketDetail />
      </Stack>
    </Container>
  );
}; 