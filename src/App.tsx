import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import theme from './utils/theme';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          {/* Routes will be added here */}
          <div>Hello AutoCRM!</div>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
