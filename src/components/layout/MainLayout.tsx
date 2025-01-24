import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { Link as RouterLink, useLocation, Outlet } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ConfirmationNumber as TicketIcon,
  Description as TemplateIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import AuthStatus from '../auth/AuthStatus';
import { useState } from 'react';

export function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Tickets', path: '/', icon: <TicketIcon /> },
    { text: 'Templates', path: '/templates', icon: <TemplateIcon /> },
    { text: 'Submit Ticket', path: '/submit', icon: <AddIcon /> },
  ];

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: 'inherit',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              flexGrow: 0, 
              mr: 4, 
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            AutoCRM
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    mr: 2,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      backgroundColor: 'grey.100',
                    },
                    ...(location.pathname === item.path && {
                      backgroundColor: 'grey.100',
                    }),
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
            <AuthStatus />
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: 240,
              boxSizing: 'border-box',
              top: 0,
              height: '100%',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          mt: 8,
          backgroundColor: 'grey.50',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout; 