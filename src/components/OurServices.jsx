import React from "react";
import {
  Search,
  BarChart3,
  Building2,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    id: 2,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2,
  },
  {
    id: 4,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    id: 5,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: MousePointerClick,
  },
  {
    id: 6,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileText,
  },
  {
    id: 7,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Hexagon,
  },
  {
    id: 8,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUp,
  },
];

const OurServices = () => {
  return (
    <section className="w-full bg-[#0d0e11] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#4d46ff] rotate-45"></span>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]">
              Features Job
            </p>
            <span className="w-1.5 h-1.5 bg-[#4d46ff] rotate-45"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-xl mx-auto leading-tight">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* Services/Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="flex items-start gap-4 group">
                {/* Icon Wrapper */}
                <div className="w-14 h-14 rounded-xl bg-[#131418] border border-white/5 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group-hover:border-purple-500/30 transition-colors duration-300">
                  <IconComponent className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-white font-semibold text-base tracking-wide">
                    {service.title}
                  </h3>
                  {/* ব্র্যাকেটের এররটি এখানে ফিক্স করা হয়েছে */}
                  <p className="text-gray-400 text-[13px] leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
