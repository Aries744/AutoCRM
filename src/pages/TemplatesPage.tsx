import { Container, Typography } from '@mui/material';
import { TemplateList } from '../components/templates/TemplateList';

export const TemplatesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Response Templates
      </Typography>
      <TemplateList />
    </Container>
  );
}; 