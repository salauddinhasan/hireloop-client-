"use client";

import React from "react";

const UserDashboard = ({ user, jobs }) => {
  return (
    <div className="p-8 min-h-screen bg-[#070708] text-white">
      <div className="max-w-5xl mx-auto">
        {/* হেডার সেকশন */}
        <div className="border border-white/[0.06] bg-[#0d0e11]/60 p-6 rounded-2xl backdrop-blur-xl mb-8">
          <h1 className="text-2xl font-bold text-[#4d46ff] mb-1">
            Job Seeker Dashboard
          </h1>
          <p className="text-gray-400 text-xs">
            Welcome back,{" "}
            <span className="text-white font-semibold">{user?.name}</span>!
            Explore new opportunities.
          </p>
        </div>

        {/* জবের লিস্ট সেকশন */}
        <h2 className="text-lg font-semibold text-gray-200 mb-4 tracking-wide">
          Available Job Circulars ({jobs?.length || 0})
        </h2>

        {jobs?.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No jobs available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs?.map((job) => (
              <div
                key={job._id}
                className="p-5 border border-white/[0.06] bg-[#0d0e11]/40 rounded-2xl flex flex-col justify-between hover:border-[#4d46ff]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base text-gray-100 hover:text-[#4d46ff] transition-colors cursor-pointer">
                      {job.title}
                    </h3>
                    <span className="bg-[#4d46ff]/10 text-[#4d46ff] border border-[#4d46ff]/20 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      {job.jobType}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium mb-3">
                    {job.companyName} •{" "}
                    <span className="text-gray-400">{job.location}</span>
                  </p>
                  <p className="text-gray-400 text-xs line-clamp-3 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/[0.04] mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                      Salary
                    </p>
                    <p className="text-xs font-semibold text-gray-200">
                      {job.salary}
                    </p>
                  </div>
                  <button className="bg-[#4d46ff] hover:bg-[#3b35cc] text-white font-semibold text-xs py-2 px-4 rounded-xl transition-all">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
