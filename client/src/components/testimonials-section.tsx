import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Testimonial data
const testimonials = [
  {
    id: 1,
    quote: "Anuj's strategic approach to sales transformed our revenue pipeline. His data-driven insights and innovative solutions helped us achieve 150% growth in just 6 months.",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 2,
    quote: "Working with Anuj was a game-changer for our marketing strategy. His expertise in digital marketing and customer acquisition helped us scale from startup to market leader.",
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 3,
    quote: "Anuj's ability to understand complex business challenges and deliver tailored solutions is exceptional. He consistently exceeds expectations and drives measurable results.",
    name: "Emily Rodriguez",
    role: "VP Sales, Enterprise Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 4,
    quote: "The sales training program Anuj developed for our team was transformative. Our conversion rates improved by 40% and team morale skyrocketed.",
    name: "David Thompson",
    role: "Sales Manager, RetailCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 5,
    quote: "Anuj's strategic consulting helped us navigate market challenges and emerge stronger. His insights are invaluable and his execution is flawless.",
    name: "Lisa Wang",
    role: "Founder, Innovation Labs",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-yellow-50/30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 animate-slideInUp">
            Client Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            What Clients Say About{" "}
            <span className="gradient-text">My Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Discover how I've helped businesses achieve their goals through strategic sales and marketing solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden">
                      <CardContent className="p-6">
                        {/* Circular headshot */}
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-100 shadow-lg">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200";
                              }}
                            />
                          </div>
                        </div>

                        {/* Quote */}
                        <blockquote className="text-center mb-6">
                          <p className="text-gray-700 italic font-normal text-base leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            "{testimonial.quote}"
                          </p>
                        </blockquote>

                        {/* Name and Role */}
                        <div className="text-center">
                          <h4 className="text-gray-900 font-semibold text-sm mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {testimonial.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex bg-white border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 shadow-lg" />
            <CarouselNext className="hidden md:flex bg-white border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 shadow-lg" />
          </Carousel>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 md:hidden">
            <div className="flex space-x-2">
              {testimonials.slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === 0 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 mb-6">
            Ready to transform your business with strategic sales and marketing solutions?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Let's Work Together
          </button>
        </div>
      </div>
    </section>
  );
} 