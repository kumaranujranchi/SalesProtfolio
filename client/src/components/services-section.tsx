import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, BarChart3, GraduationCap } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Rocket,
    title: "Strategy Consulting",
    description: "Comprehensive business strategy development and market positioning guidance.",
    price: "$150",
    period: "per hour",
    color: "from-green-500 to-emerald-500",
    buttonColor: "bg-green-500 hover:bg-emerald-500",
    popular: false
  },
  {
    icon: BarChart3,
    title: "Full Campaign Management",
    description: "End-to-end marketing campaign development, execution, and optimization.",
    price: "$5,000",
    period: "per project",
    color: "from-yellow-500 to-amber-500",
    buttonColor: "bg-yellow-500 hover:bg-amber-500",
    popular: true
  },
  {
    icon: GraduationCap,
    title: "Team Training",
    description: "Professional development workshops and sales training programs.",
    price: "$200",
    period: "per person",
    color: "from-purple-500 to-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    popular: false
  }
];

// Service card component with individual animations
function ServiceCard({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useStaggeredAnimation(index * 200);
  
  const getAnimationClass = (index: number) => {
    switch (index) {
      case 0:
        return 'animate-slideInLeft';
      case 1:
        return 'animate-bounceIn';
      case 2:
        return 'animate-slideInRight';
      default:
        return 'animate-slideInUp';
    }
  };

  return (
    <div 
      ref={ref}
      className={`transition-all duration-800 ${
        isVisible ? `${getAnimationClass(index)} opacity-100` : 'opacity-0'
      }`}
    >
      <div 
        className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 ${
          service.popular ? "border-2 border-yellow-500 scale-105" : ""
        }`}
      >
        <div className="text-center">
          {service.popular && (
            <Badge className="bg-yellow-500 text-white mb-4 animate-pulse">
              Most Popular
            </Badge>
          )}
          <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 hover:rotate-12 transition-transform duration-300`}>
            <service.icon className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <p className="text-gray-600 mb-6">{service.description}</p>
          <div className="text-4xl font-bold text-green-600 mb-2">{service.price}</div>
          <div className="text-gray-500 mb-6">{service.period}</div>
          <Button 
            className={`w-full ${service.buttonColor} text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services & Consulting</h2>
          <div className="w-24 h-1 gradient-green-yellow mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Professional consulting services tailored to your business needs and growth objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
