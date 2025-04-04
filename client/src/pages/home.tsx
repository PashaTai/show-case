import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/hero-section";
import ServicesSection from "@/components/home/services-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Andrew Ivanov | Marketing Expert</title>
        <meta name="description" content="Andrew Ivanov is a leading marketing expert helping businesses grow through strategic marketing solutions." />
      </Helmet>
      <div className="space-y-0">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
}
