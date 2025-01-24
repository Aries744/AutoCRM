import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { KnowledgeBaseArticle } from '../../types/knowledgeBase';
import { knowledgeBaseService } from '../../services/knowledgeBaseService';

export const ArticleView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await knowledgeBaseService.getArticleBySlug(slug);
        if (data) {
          setArticle(data);
          // Increment view count
          await knowledgeBaseService.incrementViews(data.id);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleHelpfulClick = async () => {
    if (!article || hasVoted) return;

    try {
      await knowledgeBaseService.incrementHelpfulCount(article.id);
      setHasVoted(true);
      setArticle(prev => prev ? {
        ...prev,
        helpful_count: prev.helpful_count + 1
      } : null);
    } catch (err) {
      console.error('Failed to update helpful count:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box p={4}>
        <Typography color="error">{error || 'Article not found'}</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {article.title}
      </Typography>

      <Box my={2}>
        <Chip
          label={article.category}
          color="primary"
          size="small"
          sx={{ mr: 1 }}
        />
        {article.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          />
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Last updated: {new Date(article.updated_at).toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" component="div" sx={{ mb: 4 }}>
        {article.content}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          {article.views_count} views
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="text.secondary" mr={2}>
            {article.helpful_count} people found this helpful
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ThumbUpIcon />}
            onClick={handleHelpfulClick}
            disabled={hasVoted}
          >
            {hasVoted ? 'Thank you!' : 'Helpful'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}; 