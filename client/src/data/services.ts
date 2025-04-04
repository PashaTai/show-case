import { BarChart3, Megaphone, Clock } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  billingPeriod: string;
  features: string[];
  iconName: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Growth Marketing Strategy",
    description: "Comprehensive marketing plan focused on sustainable growth through data-driven decisions.",
    price: 2499,
    billingPeriod: "month",
    features: [
      "Market analysis",
      "Competitive research",
      "KPI tracking",
      "Monthly reporting"
    ],
    iconName: "BarChart3"
  },
  {
    id: 2,
    title: "Brand Development Package",
    description: "Strategic brand positioning and messaging to differentiate your business in the market.",
    price: 3999,
    billingPeriod: "one-time",
    features: [
      "Brand strategy",
      "Messaging framework",
      "Value proposition",
      "Brand style guide"
    ],
    iconName: "Megaphone"
  },
  {
    id: 3,
    title: "Conversion Rate Optimization",
    description: "Transform your website visitors into paying customers through strategic optimization.",
    price: 1899,
    billingPeriod: "month",
    features: [
      "User journey analysis",
      "A/B testing",
      "Landing page optimization",
      "Conversion reporting"
    ],
    iconName: "Clock"
  }
];
