export type ArticleCategory = 'general' | 'account' | 'billing' | 'technical' | 'features';

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: ArticleCategory;
  status: ArticleStatus;
  slug: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  views_count: number;
  helpful_count: number;
  tags: string[];
}

export interface CreateArticleDTO {
  title: string;
  content: string;
  category: ArticleCategory;
  status: ArticleStatus;
  tags?: string[];
}

export interface UpdateArticleDTO extends Partial<CreateArticleDTO> {
  id: string;
} 