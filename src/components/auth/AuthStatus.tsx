import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { supabase } from '../../services/supabase';

export function AuthStatus() {
  const [status, setStatus] = useState<string>('Checking connection...');

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        setStatus('Connected to Supabase!');
      } catch (error) {
        setStatus('Error connecting to Supabase');
        console.error('Supabase connection error:', error);
      }
    }

    checkConnection();
  }, []);

  return (
    <Typography color={status.includes('Error') ? 'error' : 'primary'}>
      {status}
    </Typography>
  );
}

export default AuthStatus; 