import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './utils/theme';
import MainLayout from './components/layout/MainLayout';
import { TicketsPage } from './pages/TicketsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<TicketsPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
