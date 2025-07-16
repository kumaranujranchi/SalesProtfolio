import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 gradient-green-yellow mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-800 ${
              isVisible ? 'animate-slideInLeft opacity-100' : 'opacity-0 translate-x-[-50px]'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern office workspace" 
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div 
            className={`transition-all duration-800 ${
              isVisible ? 'animate-slideInRight opacity-100' : 'opacity-0 translate-x-[50px]'
            }`}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Transforming Ideas Into Results</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over 8 years of experience in sales and marketing, I specialize in developing comprehensive strategies that drive measurable growth. My approach combines analytical thinking with creative problem-solving to deliver exceptional results.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              I believe in the power of data-driven decisions and innovative marketing techniques to build lasting relationships with customers and create sustainable business growth.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                <div className="text-3xl font-bold text-green-500 mb-2">150+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                <div className="text-3xl font-bold text-yellow-500 mb-2">8+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
