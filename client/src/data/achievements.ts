import { Award, BookOpen, Newspaper, School, Monitor, Shield } from "lucide-react";

export interface Achievement {
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
}

export const achievements: Achievement[] = [
  {
    title: "Marketer of the Year",
    description: "Awarded \"Marketer of the Year\" by the American Marketing Association in 2018 for innovative campaign strategies.",
    iconName: "Award",
    iconColor: "text-yellow-500"
  },
  {
    title: "Published Author",
    description: "Author of three bestselling books on marketing strategy, including \"Conversion Science\" and \"Marketing in the Digital Age\".",
    iconName: "BookOpen",
    iconColor: "text-primary"
  },
  {
    title: "Featured Publications",
    description: "Regular contributor to Forbes, Harvard Business Review, and Marketing Today with over 200 published articles.",
    iconName: "Newspaper",
    iconColor: "text-secondary-500"
  },
  {
    title: "Keynote Speaker",
    description: "Delivered keynote addresses at over 50 marketing conferences globally, including SXSW and Marketing Summit.",
    iconName: "School",
    iconColor: "text-blue-500"
  },
  {
    title: "Digital Innovation Award",
    description: "Received the Digital Innovation Award for pioneering work in AI-driven marketing automation systems and predictive analytics.",
    iconName: "Monitor",
    iconColor: "text-purple-500"
  },
  {
    title: "Top Marketing Consultant",
    description: "Named one of the \"Top 25 Marketing Consultants\" by Business Insider for three consecutive years (2019-2021).",
    iconName: "Shield",
    iconColor: "text-green-500"
  }
];
