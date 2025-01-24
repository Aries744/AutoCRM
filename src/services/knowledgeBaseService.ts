import { supabase } from '../utils/supabaseClient';
import { KnowledgeBaseArticle, CreateArticleDTO, UpdateArticleDTO } from '../types/knowledgeBase';

const TABLE_NAME = 'knowledge_base_articles';

export const knowledgeBaseService = {
  async getArticles(isStaff = false): Promise<KnowledgeBaseArticle[]> {
    const query = supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (!isStaff) {
      query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getArticleBySlug(slug: string): Promise<KnowledgeBaseArticle | null> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },

  async getArticlesByCategory(category: string, isStaff = false): Promise<KnowledgeBaseArticle[]> {
    const query = supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (!isStaff) {
      query.eq('status', 'published');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createArticle(article: CreateArticleDTO): Promise<KnowledgeBaseArticle> {
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{ ...article, slug }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateArticle(article: UpdateArticleDTO): Promise<KnowledgeBaseArticle> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(article)
      .eq('id', article.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string): Promise<void> {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async incrementViews(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_article_views', { article_id: id });
    if (error) throw error;
  },

  async incrementHelpfulCount(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_article_helpful', { article_id: id });
    if (error) throw error;
  }
}; 