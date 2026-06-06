import React from "react";
import { Check, HelpCircle } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description:
      "Perfect for individuals looking to explore the platform and apply to basic roles.",
    features: [
      "Apply to 5 jobs per month",
      "Basic resume builder access",
      "Standard job search & filters",
      "Community support",
    ],
    buttonText: "Get Started Free",
    isPopular: false,
    buttonStyle:
      "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  },
  {
    name: "Professional",
    price: "$29",
    period: "month",
    description:
      "Ideal for active job seekers who want a competitive edge and direct recruitment tools.",
    features: [
      "Unlimited job applications",
      "Priority application routing",
      "Advanced AI resume builder",
      "Salary insight unlock",
      "Direct message to recruiters",
      "Dedicated email support",
    ],
    buttonText: "Upgrade to Pro",
    isPopular: true,
    buttonStyle:
      "bg-[#4d46ff] text-white hover:bg-[#3f38e0] shadow-[0_4px_20px_rgba(77,70,255,0.3)]",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "month",
    description:
      "Tailored for agencies and teams requiring mass hiring pipelines and premium features.",
    features: [
      "Everything in Professional",
      "Bulk job posting options",
      "Custom company profile branding",
      "Dedicated account manager",
      "API integrations for ATS",
      "24/7 Phone & chat support",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    buttonStyle:
      "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  },
];

const PricingSection = () => {
  return (
    <section className="w-full bg-[#0d0e11] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#4d46ff] rotate-45"></span>
            <p className="text-[#4d46ff] font-semibold text-xs uppercase tracking-[0.2em]">
              Pricing Plans
            </p>
            <span className="w-1.5 h-1.5 bg-[#4d46ff] rotate-45"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Transparent Pricing for Everyone
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Choose the plan that fits your career goals. No hidden fees. Cancel
            or upgrade at any time.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#16181c]/80 border rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${
                plan.isPopular
                  ? "border-[#4d46ff] shadow-[0_0_40px_rgba(77,70,255,0.15)] md:scale-105 z-10"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4d46ff] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Plan Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-1 mb-6 border-b border-white/5 pb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm">/{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="flex items-center justify-center gap-2 mt-12 text-gray-400 text-xs sm:text-sm">
          <HelpCircle className="w-4 h-4 text-[#4d46ff]" />
          <span>
            Have questions about custom requirements?{" "}
            <a href="#" className="text-white hover:underline font-medium">
              Get in touch with us
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
