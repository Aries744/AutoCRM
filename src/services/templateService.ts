import { supabase } from './supabase';
import { Template, CreateTemplateDTO } from '../types/template';

const TEMPLATES_TABLE = 'templates';

export const templateService = {
  async createTemplate(data: CreateTemplateDTO): Promise<Template> {
    const template = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: createdTemplate, error } = await supabase
      .from(TEMPLATES_TABLE)
      .insert(template)
      .select()
      .single();

    if (error) throw error;
    return createdTemplate;
  },

  async getTemplates(): Promise<Template[]> {
    const { data, error } = await supabase
      .from(TEMPLATES_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTemplateById(id: string): Promise<Template | null> {
    const { data, error } = await supabase
      .from(TEMPLATES_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateTemplate(id: string, updates: Partial<Template>): Promise<Template> {
    const { data, error } = await supabase
      .from(TEMPLATES_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTemplate(id: string): Promise<void> {
    const { error } = await supabase
      .from(TEMPLATES_TABLE)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 