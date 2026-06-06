"use client";

import React from "react";

const RecruiterDashboard = ({ user }) => {
  return (
    <div className="p-8 min-h-screen bg-[#070708] text-white">
      <div className="max-w-4xl mx-auto border border-white/[0.06] bg-[#0d0e11]/60 p-6 rounded-2xl backdrop-blur-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400 mb-2">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Welcome, Company Admin{" "}
              <span className="text-white font-semibold">{user?.name}</span>
            </p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)]">
            + Post a New Job
          </button>
        </div>

        {/* ডামি কন্টেন্ট কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-[#131418] border border-white/[0.04] rounded-xl">
            <h3 className="font-semibold text-sm mb-1">Active Jobs</h3>
            <p className="text-2xl font-bold text-gray-300">0</p>
          </div>
          <div className="p-4 bg-[#131418] border border-white/[0.04] rounded-xl">
            <h3 className="font-semibold text-sm mb-1">Total Applicants</h3>
            <p className="text-2xl font-bold text-gray-300">0</p>
          </div>
          <div className="p-4 bg-[#131418] border border-white/[0.04] rounded-xl">
            <h3 className="font-semibold text-sm mb-1">Shortlisted</h3>
            <p className="text-2xl font-bold text-emerald-400">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
