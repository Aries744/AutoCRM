import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './utils/theme';
import MainLayout from './components/layout/MainLayout';
import { TicketsPage } from './pages/TicketsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { SubmitTicketPage } from './pages/SubmitTicketPage';
import { AuthProvider } from './contexts/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './contexts/AuthContext';
import MyTicketsPage from './pages/MyTicketsPage';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TicketsPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/tickets/:id" element={<TicketDetailPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/submit" element={<SubmitTicketPage />} />
              <Route path="/my-tickets" element={<MyTicketsPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
