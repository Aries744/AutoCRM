import { Template, CreateTemplateDTO } from '../types/template';

// Placeholder data for development
const PLACEHOLDER_TEMPLATES: Template[] = [
  {
    id: '1',
    title: 'Access Issue Resolution',
    content: 'Thank you for reporting the access issue. Our team has investigated and resolved the permissions conflict. Please try accessing the system again and let us know if you experience any further issues.',
    category: 'Access Control',
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 604800000).toISOString(),
    created_by: 'support.lead@company.com',
    is_shared: true
  },
  {
    id: '2',
    title: 'Performance Investigation Update',
    content: 'We are actively investigating the performance issue you reported. Our monitoring systems have identified some potential bottlenecks, and our team is working on optimizing these areas. We will keep you updated on our progress.',
    category: 'Performance',
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date(Date.now() - 432000000).toISOString(),
    created_by: 'tech.lead@company.com',
    is_shared: true
  },
  {
    id: '3',
    title: 'API Integration Guide',
    content: 'Here are the resources for API integration:\n\n1. API Documentation: docs.example.com\n2. Sample Code Repository: github.com/example/api-samples\n3. Integration Guide: docs.example.com/guides/integration\n\nIf you need any clarification, please don\'t hesitate to ask.',
    category: 'Development',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    created_by: 'dev.support@company.com',
    is_shared: true
  },
  {
    id: '4',
    title: 'Feature Request Acknowledgment',
    content: 'Thank you for your feature suggestion! We appreciate your input in making our product better. Our product team has reviewed your request and added it to our feature consideration list. We\'ll notify you of any updates regarding this feature.',
    category: 'Product Feedback',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    created_by: 'product.manager@company.com',
    is_shared: true
  },
  {
    id: '5',
    title: 'General Thank You',
    content: 'Thank you for bringing this to our attention. We\'re looking into it and will get back to you as soon as possible with more information.',
    category: 'General',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    created_by: 'support.team@company.com',
    is_shared: true
  }
];

export const templateService = {
  async createTemplate(data: CreateTemplateDTO): Promise<Template> {
    try {
      // For development, return mock response
      return {
        ...data,
        id: (Math.random() * 1000000).toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 'test.user@example.com',
        is_shared: true
      } as Template;
    } catch (err) {
      console.error('Failed to create template:', err);
      throw err;
    }
  },

  async getTemplates(): Promise<Template[]> {
    try {
      // For development, return placeholder data
      return PLACEHOLDER_TEMPLATES;
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      throw err;
    }
  },

  async getTemplateById(id: string): Promise<Template | null> {
    try {
      // For development, return placeholder data
      const template = PLACEHOLDER_TEMPLATES.find(t => t.id === id);
      return template || null;
    } catch (err) {
      console.error('Failed to fetch template:', err);
      throw err;
    }
  },

  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template> {
    try {
      // For development, return mock response
      const template = PLACEHOLDER_TEMPLATES.find(t => t.id === id);
      if (!template) throw new Error('Template not found');
      
      return {
        ...template,
        ...updates,
        updated_at: new Date().toISOString(),
      };
    } catch (err) {
      console.error('Failed to update template:', err);
      throw err;
    }
  },

  async deleteTemplate(_id: string): Promise<void> {
    try {
      // For development, do nothing
      return;
    } catch (err) {
      console.error('Failed to delete template:', err);
      throw err;
    }
  }
}; 