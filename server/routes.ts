import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const result = await storage.createContactMessage(contactData);
      res.status(201).json({ success: true, message: "Contact message received" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to process the contact request" });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      const result = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json({ success: true, message: "Newsletter subscription successful" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to process the subscription request" });
      }
    }
  });

  // Get all contact messages (for admin purposes)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve contact messages" });
    }
  });

  // Get all newsletter subscriptions (for admin purposes)
  app.get("/api/newsletter-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to retrieve newsletter subscriptions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
