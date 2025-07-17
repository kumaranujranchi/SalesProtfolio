import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { RainEffect } from "@/components/background-effects";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen gradient-green-yellow flex items-center pt-16 relative overflow-hidden">
      <RainEffect />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-slideInLeft">
              <span className="text-sm font-medium">Sales & Marketing Professional</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slideInUp">
              Driving Growth Through{" "}
              <span className="text-yellow-300">Strategic Excellence</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed animate-slideInUp" style={{ animationDelay: '0.2s' }}>
              Passionate about transforming businesses through innovative sales strategies and data-driven marketing solutions. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Eye className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-2xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-slideInRight">
            <div className="relative">
              {/* Main circular image container */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 backdrop-blur-sm">
                {/* Concentric circles background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-yellow-400 to-green-500">
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-300/80 to-yellow-300/80"></div>
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-200/60 to-yellow-200/60"></div>
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-green-100/40 to-yellow-100/40"></div>
                  <div className="absolute inset-16 rounded-full bg-white/20"></div>
                </div>

                {/* Your image will go here - replace the src with your image path */}
                <img
                  src="/src/assets/images/profile.jpg"
                  alt="Professional sales and marketing expert"
                  className="absolute inset-20 w-40 h-40 rounded-full object-cover z-10 border-2 border-white/50"
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200";
                  }}
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full animate-float shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/40 rounded-full animate-float shadow-lg" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-yellow-300/60 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
              <div className="absolute bottom-1/4 -right-8 w-6 h-6 bg-white/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
