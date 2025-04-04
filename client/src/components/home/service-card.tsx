import { Link } from "wouter";
import { Check, BarChart3, Megaphone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Function to render the appropriate icon based on iconName
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "BarChart3":
        return <BarChart3 className="h-6 w-6 text-primary" />;
      case "Megaphone":
        return <Megaphone className="h-6 w-6 text-primary" />;
      case "Clock":
        return <Clock className="h-6 w-6 text-primary" />;
      default:
        return <BarChart3 className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="bg-white overflow-hidden shadow rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <CardContent className="px-4 py-5 sm:p-6">
        <div className="rounded-full bg-primary-100 w-12 h-12 flex items-center justify-center mb-4">
          {renderIcon(service.iconName)}
        </div>
        <h3 className="text-lg font-medium text-slate-900">{service.title}</h3>
        <p className="mt-2 text-base text-slate-500">
          {service.description}
        </p>
        <div className="mt-4">
          <span className="text-secondary-500 font-bold">${service.price.toLocaleString()}</span>
          <span className="text-slate-500"> / {service.billingPeriod}</span>
        </div>
        <ul className="mt-4 space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex">
              <Check className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="bg-slate-50 px-4 py-4 sm:px-6">
        <Button asChild className="w-full">
          <Link href="/#contact">Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
