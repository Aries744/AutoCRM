export interface Template {
  id: string;
  title: string;
  content: string;
  category?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  is_shared: boolean;
}

export interface CreateTemplateDTO {
  title: string;
  content: string;
  category?: string;
  is_shared?: boolean;
} 