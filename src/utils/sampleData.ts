import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { ArticleCategory, ArticleStatus } from '../types/knowledgeBase';

// ... any existing code ...

export const initializeSampleData = async () => {
  console.log('Initializing sample data...');
  await createSampleKnowledgeBaseArticles();
  console.log('Sample data initialization complete.');
};

export const createSampleKnowledgeBaseArticles = async () => {
  const articles = [
    {
      title: "Getting Started with AutoCRM",
      content: `Welcome to AutoCRM! This guide will help you get started with our customer support system.

Key Features:
- Submit and track support tickets
- Access our knowledge base
- Get real-time updates on your requests
- Communicate with our support team

To get started, simply log in to your account and navigate to the 'Submit Ticket' page.`,
      category: "general" as ArticleCategory,
      status: "published" as ArticleStatus,
      tags: ["getting started", "guide", "introduction"]
    },
    {
      title: "How to Submit a Support Ticket",
      content: `Follow these steps to submit a support ticket:

1. Click on 'Submit Ticket' in the navigation menu
2. Fill in the ticket title and description
3. Select the appropriate priority level
4. Add relevant tags
5. Click Submit

Tips for effective tickets:
- Be specific about your issue
- Include any relevant error messages
- Describe what you've already tried
- Add screenshots if applicable`,
      category: "technical" as ArticleCategory,
      status: "published" as ArticleStatus,
      tags: ["tickets", "help", "support", "how-to"]
    },
    {
      title: "Account Management Guide",
      content: `Learn how to manage your AutoCRM account effectively:

Account Settings:
- Update your profile information
- Change your password
- Manage email preferences
- View your ticket history

Security Best Practices:
- Use a strong password
- Enable two-factor authentication when available
- Keep your contact information up to date
- Log out when using shared devices`,
      category: "account" as ArticleCategory,
      status: "published" as ArticleStatus,
      tags: ["account", "security", "settings"]
    },
    {
      title: "Billing and Subscriptions FAQ",
      content: `Common questions about billing and subscriptions:

Q: How often will I be billed?
A: Billing occurs monthly on the date you signed up.

Q: What payment methods do you accept?
A: We accept all major credit cards and PayPal.

Q: How do I update my billing information?
A: Go to Account Settings > Billing to update your payment details.

Q: Can I get a refund?
A: Please contact our support team to discuss refund requests.`,
      category: "billing" as ArticleCategory,
      status: "published" as ArticleStatus,
      tags: ["billing", "payments", "faq", "subscriptions"]
    },
    {
      title: "Advanced Features Overview",
      content: `Discover AutoCRM's advanced features:

1. Knowledge Base
- Search for solutions
- Browse by category
- Rate helpful articles
- Access guides and tutorials

2. Ticket Management
- Real-time updates
- File attachments
- Priority levels
- Tag system

3. Communication Tools
- Internal notes
- Email notifications
- Status updates
- Response templates`,
      category: "features" as ArticleCategory,
      status: "published" as ArticleStatus,
      tags: ["features", "advanced", "overview"]
    }
  ];

  for (const article of articles) {
    try {
      await knowledgeBaseService.createArticle(article);
    } catch (error) {
      console.error(`Failed to create article: ${article.title}`, error);
    }
  }
}; 