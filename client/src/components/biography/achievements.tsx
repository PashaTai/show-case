import { achievements } from "@/data/achievements";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Newspaper, School, Monitor, Shield } from "lucide-react";

export default function Achievements() {
  // Function to render the appropriate icon based on iconName
  const renderIcon = (iconName: string, iconColor: string) => {
    const iconProps = { className: `h-10 w-10 ${iconColor}` };
    
    switch (iconName) {
      case "Award":
        return <Award {...iconProps} />;
      case "BookOpen":
        return <BookOpen {...iconProps} />;
      case "Newspaper":
        return <Newspaper {...iconProps} />;
      case "School":
        return <School {...iconProps} />;
      case "Monitor":
        return <Monitor {...iconProps} />;
      case "Shield":
        return <Shield {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Achievements & Recognition</h2>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
            Awards, publications, and speaking engagements throughout my career.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    {renderIcon(achievement.iconName, achievement.iconColor)}
                    <h3 className="ml-3 text-lg font-bold text-slate-900">{achievement.title}</h3>
                  </div>
                  <p className="text-slate-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
