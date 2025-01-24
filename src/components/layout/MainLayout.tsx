import { ReactNode } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthStatus from '../auth/AuthStatus';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
            AutoCRM
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: 'white', mr: 2 }}
            >
              Tickets
            </Button>
            <Button
              component={RouterLink}
              to="/templates"
              sx={{ color: 'white', mr: 2 }}
            >
              Templates
            </Button>
            <Button
              component={RouterLink}
              to="/submit"
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Submit Ticket
            </Button>
          </Box>
          <AuthStatus />
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}

export default MainLayout; 