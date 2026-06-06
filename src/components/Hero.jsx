"use client";

import React from "react";
import Link from "next/link";

const stats = [
  { value: "12,400+", label: "Active Jobs" },
  { value: "3,200+", label: "Companies" },
  { value: "98,000+", label: "Job Seekers" },
  { value: "94%", label: "Satisfaction Rate" },
];

const Hero = () => {
  return (
    <section className="w-full bg-[#0d0e11]   flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4d46ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#ff6600]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">
            12,400+ jobs available right now
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-5">
          Find Your Dream Job{" "}
          <span className="bg-gradient-to-r from-[#4d46ff] to-[#ff6600] bg-clip-text text-transparent">
            Faster Than Ever
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          HireLoop connects top talent with the world&apos;s best companies. Smart
          search, instant apply, and real-time tracking — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/jobs"
            className="bg-gradient-to-r from-[#4d46ff] to-[#6b66ff] text-white font-semibold px-8 py-4 rounded-xl shadow-[0_4px_30px_rgba(77,70,255,0.4)] hover:opacity-90 transition-all transform hover:-translate-y-[2px] text-base w-full sm:w-auto text-center"
          >
             Search Jobs
          </Link>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-[2px] text-base w-full sm:w-auto text-center"
          >
             Post a Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl font-black text-white mb-1">
                {stat.value}
              </span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
