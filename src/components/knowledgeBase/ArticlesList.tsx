import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { KnowledgeBaseArticle, ArticleCategory } from '../../types/knowledgeBase';
import { knowledgeBaseService } from '../../services/knowledgeBaseService';
import { useAuth } from '../../contexts/AuthContext';

export const ArticlesList: React.FC = () => {
  const { user } = useAuth();
  const isStaff = user?.email?.endsWith('@gauntletai.com');
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [error, setError] = useState<string | null>(null);

  const categories: ArticleCategory[] = ['general', 'account', 'billing', 'technical', 'features'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = selectedCategory === 'all'
          ? await knowledgeBaseService.getArticles(isStaff)
          : await knowledgeBaseService.getArticlesByCategory(selectedCategory, isStaff);
        setArticles(data);
      } catch (err) {
        setError('Failed to load articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, isStaff]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value as ArticleCategory | 'all')}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <List>
        {articles.map((article) => (
          <ListItem
            key={article.id}
            component={Link}
            to={`/knowledge-base/${article.slug}`}
            sx={{
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={
                <Typography variant="h6" component="div">
                  {article.title}
                </Typography>
              }
              secondary={
                <Box mt={1}>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {article.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                  ))}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {`${article.views_count} views • ${article.helpful_count} found helpful`}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 