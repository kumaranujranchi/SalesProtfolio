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
  Globe,
  CheckCircle,
  Star,
  Trophy,
  Zap
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skills = [
  {
    icon: TrendingUp,
    title: "Sales Strategy",
    description: "Developing comprehensive sales frameworks and conversion optimization strategies.",
    color: "from-blue-500 to-blue-600",
    backContent: {
      achievements: ["40% revenue increase", "15+ team members led", "95% target achievement"],
      years: "8+ Years"
    }
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Multi-channel marketing campaigns with focus on ROI and customer acquisition.",
    color: "from-green-500 to-green-600",
    backContent: {
      achievements: ["300% online conversion", "60% customer growth", "Multi-platform expertise"],
      years: "6+ Years"
    }
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Advanced analytics and reporting to drive data-informed business decisions.",
    color: "from-purple-500 to-purple-600",
    backContent: {
      achievements: ["Advanced reporting", "Business intelligence", "Predictive analytics"],
      years: "5+ Years"
    }
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Building and managing high-performing sales and marketing teams.",
    color: "from-red-500 to-red-600",
    backContent: {
      achievements: ["Team of 15+ managed", "Leadership training", "Performance coaching"],
      years: "7+ Years"
    }
  },
  {
    icon: Handshake,
    title: "Client Relations",
    description: "Building long-term partnerships and managing key account relationships.",
    color: "from-yellow-500 to-yellow-600",
    backContent: {
      achievements: ["95% retention rate", "Key account management", "Partnership building"],
      years: "8+ Years"
    }
  },
  {
    icon: Settings,
    title: "Process Optimization",
    description: "Streamlining workflows and implementing automation for efficiency.",
    color: "from-indigo-500 to-indigo-600",
    backContent: {
      achievements: ["Workflow automation", "Efficiency improvements", "System integration"],
      years: "4+ Years"
    }
  },
  {
    icon: Search,
    title: "Market Research",
    description: "Comprehensive market analysis and competitive intelligence gathering.",
    color: "from-teal-500 to-teal-600",
    backContent: {
      achievements: ["Market analysis", "Competitive intelligence", "Research methodologies"],
      years: "6+ Years"
    }
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Creative problem-solving and implementing cutting-edge marketing technologies.",
    color: "from-pink-500 to-pink-600",
    backContent: {
      achievements: ["Creative solutions", "Technology adoption", "Innovation leadership"],
      years: "5+ Years"
    }
  },
  {
    icon: BarChart3,
    title: "Performance Analysis",
    description: "KPI tracking and performance optimization across all business functions.",
    color: "from-orange-500 to-orange-600",
    backContent: {
      achievements: ["KPI optimization", "Performance tracking", "Business metrics"],
      years: "6+ Years"
    }
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "End-to-end campaign planning, execution, and performance tracking.",
    color: "from-cyan-500 to-cyan-600",
    backContent: {
      achievements: ["Campaign execution", "Performance tracking", "ROI optimization"],
      years: "7+ Years"
    }
  },
  {
    icon: ChartPie,
    title: "Business Intelligence",
    description: "Transforming raw data into actionable business insights and strategies.",
    color: "from-emerald-500 to-emerald-600",
    backContent: {
      achievements: ["Business insights", "Strategic planning", "Data transformation"],
      years: "5+ Years"
    }
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "International market expansion and cross-cultural marketing strategies.",
    color: "from-violet-500 to-violet-600",
    backContent: {
      achievements: ["International expansion", "Cross-cultural marketing", "Global strategies"],
      years: "4+ Years"
    }
  }
];

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
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
              className={`flip-card h-64 transition-all duration-500 ${
                isVisible ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front bg-white p-6 shadow-lg">
                  <div className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <skill.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{skill.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{skill.description}</p>
                </div>

                {/* Back Side */}
                <div className={`flip-card-back bg-gradient-to-br ${skill.color} p-6 shadow-lg flex flex-col justify-center text-white`}>
                  <div className="text-center mb-4">
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                    <p className="text-lg font-semibold opacity-90">{skill.backContent.years}</p>
                  </div>
                  <div className="space-y-2">
                    {skill.backContent.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
