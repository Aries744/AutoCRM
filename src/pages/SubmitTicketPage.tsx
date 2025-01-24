import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
  Alert,
  Chip,
  useTheme,
} from '@mui/material';
import { ticketService } from '../services/ticketService';
import { TicketPriority } from '../types/ticket';
import { Add as AddIcon } from '@mui/icons-material';

export const SubmitTicketPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as TicketPriority,
    tags: [] as string[],
    tagInput: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await ticketService.createTicket({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        tags: formData.tags
      });
      setSubmitted(true);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        tags: [],
        tagInput: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit ticket');
    }
  };

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const priorityColors = {
    low: theme.palette.success.main,
    medium: theme.palette.warning.main,
    high: theme.palette.error.main,
    urgent: theme.palette.error.dark,
  };

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.contrastText
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ticket Submitted Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We'll get back to you as soon as possible.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setSubmitted(false)}
            sx={{ 
              backgroundColor: theme.palette.common.white,
              color: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.common.white,
                opacity: 0.9
              }
            }}
          >
            Submit Another Ticket
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 700,
            mb: 3
          }}
        >
          Submit Support Ticket
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: theme.shape.borderRadius
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              required
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              helperText="Brief summary of your issue"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.common.white,
                }
              }}
            />

            <TextField
              label="Description"
              required
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              helperText="Please provide detailed information about your issue"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.common.white,
                }
              }}
            />

            <TextField
              select
              label="Priority"
              required
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
              helperText="Select the priority level of your issue"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.common.white,
                }
              }}
            >
              {Object.entries(priorityColors).map(([priority, color]) => (
                <MenuItem 
                  key={priority} 
                  value={priority}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: `${color}20`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: color,
                        mr: 1
                      }}
                    />
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField
                  label="Add Tags"
                  value={formData.tagInput}
                  onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  helperText="Press Enter to add tags"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.common.white,
                    }
                  }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddTag}
                  startIcon={<AddIcon />}
                  sx={{ 
                    mt: 1,
                    height: 56
                  }}
                >
                  Add
                </Button>
              </Stack>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      '& .MuiChip-deleteIcon': {
                        color: theme.palette.primary.contrastText,
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!formData.title || !formData.description}
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Submit Ticket
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}; 