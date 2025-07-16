import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const journeyItems = [
  {
    title: "Senior Sales Manager",
    company: "TechCorp Solutions",
    period: "2021 - Present",
    description: "Leading a team of 15+ sales professionals, implementing strategic initiatives that increased revenue by 40% year-over-year.",
    color: "border-green-500",
    dotColor: "bg-green-500",
    side: "left"
  },
  {
    title: "Marketing Director",
    company: "Digital Innovations Inc.",
    period: "2019 - 2021",
    description: "Developed and executed comprehensive digital marketing strategies, resulting in 300% increase in online conversions and 60% growth in customer acquisition.",
    color: "border-emerald-500",
    dotColor: "bg-emerald-500",
    side: "right"
  },
  {
    title: "Sales Specialist",
    company: "Growth Dynamics",
    period: "2017 - 2019",
    description: "Specialized in B2B sales and client relationship management, consistently exceeding quarterly targets by 25%+ and maintaining 95% client retention rate.",
    color: "border-yellow-500",
    dotColor: "bg-yellow-500",
    side: "left"
  },
  {
    title: "Junior Marketing Analyst",
    company: "StartUp Ventures",
    period: "2015 - 2017",
    description: "Started my journey in marketing analytics, developing skills in data analysis, market research, and campaign optimization that formed the foundation of my career.",
    color: "border-amber-500",
    dotColor: "bg-amber-500",
    side: "right"
  }
];

// Journey item component to handle individual animations
function JourneyItem({ item, index }: { item: any; index: number }) {
  const { ref, isVisible } = useStaggeredAnimation(index * 200);
  
  return (
    <div 
      ref={ref}
      className={`flex items-center justify-between transition-all duration-800 ${
        isVisible 
          ? item.side === "left" 
            ? 'animate-slideInLeft opacity-100' 
            : 'animate-slideInRight opacity-100'
          : 'opacity-0'
      }`}
    >
      {item.side === "left" ? (
        <>
          <div className="w-5/12 text-right pr-8">
            <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${item.color} transform hover:scale-105 transition-transform duration-300`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-green-600 font-medium mb-2">{item.company}</p>
              <p className="text-gray-600 text-sm mb-3">{item.period}</p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
          <div className="w-2/12 flex justify-center">
            <div className={`w-4 h-4 ${item.dotColor} rounded-full border-4 border-white shadow-lg transform hover:scale-150 transition-transform duration-300`}></div>
          </div>
          <div className="w-5/12"></div>
        </>
      ) : (
        <>
          <div className="w-5/12"></div>
          <div className="w-2/12 flex justify-center">
            <div className={`w-4 h-4 ${item.dotColor} rounded-full border-4 border-white shadow-lg transform hover:scale-150 transition-transform duration-300`}></div>
          </div>
          <div className="w-5/12 text-left pl-8">
            <div className={`bg-white p-6 rounded-xl shadow-lg border-r-4 ${item.color} transform hover:scale-105 transition-transform duration-300`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-emerald-600 font-medium mb-2">{item.company}</p>
              <p className="text-gray-600 text-sm mb-3">{item.period}</p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function JourneySection() {
  return (
    <section id="journey" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Journey</h2>
          <div className="w-24 h-1 gradient-green-yellow mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            A timeline of growth, achievements, and continuous learning throughout my career.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 gradient-green-yellow rounded-full"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {journeyItems.map((item, index) => (
              <JourneyItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
