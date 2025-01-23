import { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Stack,
  Chip
} from '@mui/material';
import { Template } from '../../types/template';
import { templateService } from '../../services/templateService';

interface TemplateSelectorProps {
  onSelectTemplate: (content: string) => void;
}

export const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [customizedContent, setCustomizedContent] = useState('');

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await templateService.getTemplates();
        setTemplates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates');
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCustomizedContent(template.content);
    setPreviewOpen(true);
    handleClose();
  };

  const handleInsert = () => {
    onSelectTemplate(customizedContent);
    setPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setSelectedTemplate(null);
  };

  if (error) return null;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        disabled={loading || templates.length === 0}
      >
        Insert Template
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {templates.map((template) => (
          <MenuItem
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
          >
            <ListItemText
              primary={template.title}
              secondary={template.category}
            />
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedTemplate?.title}
          {selectedTemplate?.category && (
            <Chip
              label={selectedTemplate.category}
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Customize the template content if needed:
            </Typography>
            <TextField
              value={customizedContent}
              onChange={(e) => setCustomizedContent(e.target.value)}
              multiline
              rows={6}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose}>Cancel</Button>
          <Button onClick={handleInsert} variant="contained">
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 