import { Box, Button, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export function AuthStatus() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={handleLogout}
        startIcon={<LogoutOutlined />}
      >
        Logout
      </Button>
    </Box>
  );
}

export default AuthStatus; 