import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DatasetIcon from '@mui/icons-material/Dataset';
import { useNavigate } from 'react-router-dom';
import { ArticlesList } from '../components/knowledgeBase/ArticlesList';
import { ArticleView } from '../components/knowledgeBase/ArticleView';
import { ArticleEditor } from '../components/knowledgeBase/ArticleEditor';
import { useAuth } from '../contexts/AuthContext';
import { initializeSampleData } from '../utils/sampleData';

export const KnowledgeBasePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isStaff = user?.email?.endsWith('@gauntletai.com');

  const handleInitializeSampleData = async () => {
    try {
      await initializeSampleData();
      window.location.reload(); // Reload to show new articles
    } catch (error) {
      console.error('Failed to initialize sample data:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">
            Knowledge Base
          </Typography>
          {isStaff && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<DatasetIcon />}
                onClick={handleInitializeSampleData}
              >
                Add Sample Articles
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/knowledge-base/new')}
              >
                New Article
              </Button>
            </Box>
          )}
        </Box>

        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/new" element={isStaff ? <ArticleEditor /> : <Typography>Access Denied</Typography>} />
          <Route path="/edit/:id" element={isStaff ? <ArticleEditor /> : <Typography>Access Denied</Typography>} />
          <Route path="/:slug" element={<ArticleView />} />
        </Routes>
      </Box>
    </Container>
  );
}; 