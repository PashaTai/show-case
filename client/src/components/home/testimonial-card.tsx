import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400 fill-current" />);
    }
    
    return stars;
  };

  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <CardContent className="px-6 py-8">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-slate-900">{testimonial.name}</h3>
            <p className="text-sm text-slate-500">{testimonial.title}, {testimonial.company}</p>
          </div>
        </div>
        <div className="flex mb-2">
          {renderStars(testimonial.rating)}
        </div>
        <p className="text-base text-slate-600">
          "{testimonial.quote}"
        </p>
      </CardContent>
    </Card>
  );
}
