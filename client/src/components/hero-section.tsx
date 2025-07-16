import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen gradient-green-yellow flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">Sales & Marketing Professional</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Driving Growth Through{" "}
              <span className="text-yellow-300">Strategic Excellence</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 leading-relaxed">
              Passionate about transforming businesses through innovative sales strategies and data-driven marketing solutions. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Eye className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
