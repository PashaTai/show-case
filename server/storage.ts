import { 
  contactMessages, 
  type ContactMessage, 
  type InsertContactMessage,
  newsletterSubscriptions,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<number, ContactMessage>;
  private contactMessagesId: number;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private newsletterSubscriptionsId: number;

  constructor() {
    this.contactMessages = new Map();
    this.contactMessagesId = 1;
    this.newsletterSubscriptions = new Map();
    this.newsletterSubscriptionsId = 1;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessagesId++;
    const now = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id,
      createdAt: now
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === subscription.email
    );

    if (existingSubscription) {
      return existingSubscription;
    }

    const id = this.newsletterSubscriptionsId++;
    const now = new Date();
    const newsletterSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      createdAt: now
    };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

export const storage = new MemStorage();
