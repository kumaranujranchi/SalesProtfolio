import { 
  TrendingUp, 
  Megaphone, 
  Database, 
  Users, 
  Handshake, 
  Settings, 
  Search, 
  Lightbulb,
  BarChart3,
  Target,
  ChartPie,
  Globe
} from "lucide-react";

const skills = [
  {
    icon: TrendingUp,
    title: "Sales Strategy",
    description: "Developing comprehensive sales frameworks and conversion optimization strategies.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Multi-channel marketing campaigns with focus on ROI and customer acquisition.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Advanced analytics and reporting to drive data-informed business decisions.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Building and managing high-performing sales and marketing teams.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Handshake,
    title: "Client Relations",
    description: "Building long-term partnerships and managing key account relationships.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Settings,
    title: "Process Optimization",
    description: "Streamlining workflows and implementing automation for efficiency.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Search,
    title: "Market Research",
    description: "Comprehensive market analysis and competitive intelligence gathering.",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Creative problem-solving and implementing cutting-edge marketing technologies.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: BarChart3,
    title: "Performance Analysis",
    description: "KPI tracking and performance optimization across all business functions.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "End-to-end campaign planning, execution, and performance tracking.",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: ChartPie,
    title: "Business Intelligence",
    description: "Transforming raw data into actionable business insights and strategies.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "International market expansion and cross-cultural marketing strategies.",
    color: "from-violet-500 to-violet-600"
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 gradient-green-yellow mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit of skills developed through years of hands-on experience and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
