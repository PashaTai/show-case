import { Award, BookOpen, Newspaper, School, Monitor, Shield } from "lucide-react";
import { ReactNode } from "react";

export interface Achievement {
  title: string;
  description: string;
  icon: ReactNode;
}

export const achievements: Achievement[] = [
  {
    title: "Marketer of the Year",
    description: "Awarded \"Marketer of the Year\" by the American Marketing Association in 2018 for innovative campaign strategies.",
    icon: <Award className="h-10 w-10 text-yellow-500" />
  },
  {
    title: "Published Author",
    description: "Author of three bestselling books on marketing strategy, including \"Conversion Science\" and \"Marketing in the Digital Age\".",
    icon: <BookOpen className="h-10 w-10 text-primary" />
  },
  {
    title: "Featured Publications",
    description: "Regular contributor to Forbes, Harvard Business Review, and Marketing Today with over 200 published articles.",
    icon: <Newspaper className="h-10 w-10 text-secondary-500" />
  },
  {
    title: "Keynote Speaker",
    description: "Delivered keynote addresses at over 50 marketing conferences globally, including SXSW and Marketing Summit.",
    icon: <School className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Digital Innovation Award",
    description: "Received the Digital Innovation Award for pioneering work in AI-driven marketing automation systems and predictive analytics.",
    icon: <Monitor className="h-10 w-10 text-purple-500" />
  },
  {
    title: "Top Marketing Consultant",
    description: "Named one of the \"Top 25 Marketing Consultants\" by Business Insider for three consecutive years (2019-2021).",
    icon: <Shield className="h-10 w-10 text-green-500" />
  }
];
