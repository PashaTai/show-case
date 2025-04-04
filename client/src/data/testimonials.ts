export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Chen",
    title: "CEO",
    company: "TechStart",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: "Andrew's marketing strategy transformed our business. We saw a 215% increase in qualified leads within just 3 months of implementing his recommendations.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Marketing Director",
    company: "FashionMode",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: "The brand development package Andrew created for us was worth every penny. Our messaging is now clear, consistent, and resonates with our target audience like never before.",
    rating: 5
  },
  {
    id: 3,
    name: "David Williams",
    title: "Founder",
    company: "HealthPlus",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    quote: "Working with Andrew on our conversion optimization was game-changing. Our conversion rate went from 1.2% to 4.8% in just 6 weeks, significantly increasing our revenue.",
    rating: 5
  }
];
