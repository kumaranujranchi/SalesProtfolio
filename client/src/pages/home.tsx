import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import JourneySection from "@/components/journey-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { BackgroundClouds } from "@/components/background-effects";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background clouds throughout the site */}
      <BackgroundClouds />
      
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <JourneySection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
