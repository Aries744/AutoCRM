import { useState } from 'react';
import { Box, Tab, Tabs, Paper } from '@mui/material';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user } = useAuth();

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.50',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%',
          maxWidth: '400px',
          mx: 'auto',
          borderRadius: 2,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <SignInForm />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <SignUpForm />
        </TabPanel>
      </Paper>
    </Box>
  );
}; 