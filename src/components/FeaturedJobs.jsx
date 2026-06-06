"use client";

import React from "react";
import Link from "next/link";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $120k",
    logo: "TN",
    color: "from-[#4d46ff] to-[#6b66ff]",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Designify",
    location: "New York, USA",
    type: "Full-time",
    salary: "$70k - $100k",
    logo: "D",
    color: "from-[#ff6600] to-[#ff9900]",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudBase",
    location: "London, UK",
    type: "Remote", // Certifique-se de que o type bate com as chaves de typeColors
    salary: "$90k - $130k",
    logo: "CB",
    color: "from-[#00b894] to-[#00cec9]",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Ventures",
    location: "San Francisco, USA",
    type: "Full-time",
    salary: "$110k - $160k",
    logo: "AV",
    color: "from-[#6c5ce7] to-[#a29bfe]",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Infrastack",
    location: "Remote",
    type: "Contract",
    salary: "$95k - $140k",
    logo: "IS",
    color: "from-[#e17055] to-[#fab1a0]",
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "GrowthLab",
    location: "Toronto, Canada",
    type: "Part-time",
    salary: "$50k - $70k",
    logo: "GL",
    color: "from-[#0984e3] to-[#74b9ff]",
  },
];

const typeColors = {
  "Full-time": "bg-green-500/10 text-green-400 border-green-500/20",
  Remote: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contract: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Part-time": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const FeaturedJobs = () => {
  return (
    <section className="w-full bg-[#0d0e11] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#4d46ff] font-semibold text-sm uppercase tracking-widest mb-2">
            Featured Jobs
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Hand-Picked Opportunities
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore top job listings curated for you. New roles added daily from
            the world&apos;s best companies.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredJobs.map((job) => (
            <Link
              href={`/jobs/${job.id}`}
              key={job.id}
              className="bg-[#16181c]/80 border border-white/5 rounded-2xl p-6 hover:border-[#4d46ff]/40 hover:shadow-[0_0_30px_rgba(77,70,255,0.1)] transition-all transform hover:-translate-y-1 group"
            >
              {/* Company Logo + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white font-black text-sm shrink-0`}
                >
                  {job.logo}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-[#4d46ff] transition-colors">
                    {job.title}
                  </h3>
                  {/* CORRIGIDO AQUI: Deixou de ser um link quebrado */}
                  <p className="text-gray-400 text-sm">{job.company}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Fallback adicionado para prevenir quebra caso o tipo mude */}
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${typeColors[job.type] || "bg-gray-500/10 text-gray-400 border-white/10"}`}
                >
                  {job.type}
                </span>
                <span className="text-xs px-3 py-1 rounded-full border bg-white/5 text-gray-400 border-white/10">
                  📍 {job.location}
                </span>
              </div>

              {/* Salary */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-white font-semibold text-sm">
                  {job.salary}
                </span>
                <span className="text-[#4d46ff] text-sm font-medium group-hover:underline">
                  View Job →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            View All Jobs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
