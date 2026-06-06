"use client";

import React from "react";

const UserDashboard = ({ user }) => {
  return (
    <div className="p-8 min-h-screen bg-[#070708] text-white">
      <div className="max-w-4xl mx-auto border border-white/[0.06] bg-[#0d0e11]/60 p-6 rounded-2xl backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-[#4d46ff] mb-2">
          Job Seeker Dashboard
        </h1>
        <p className="text-gray-400 text-sm mb-4">
          Welcome back,{" "}
          <span className="text-white font-semibold">{user?.name}</span>!
        </p>

        {/* ডামি কন্টেন্ট কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-[#131418] border border-white/[0.04] rounded-xl">
            <h3 className="font-semibold text-sm mb-1">Applied Jobs</h3>
            <p className="text-2xl font-bold text-gray-300">0</p>
          </div>
          <div className="p-4 bg-[#131418] border border-white/[0.04] rounded-xl">
            <h3 className="font-semibold text-sm mb-1">Profile Completeness</h3>
            <p className="text-2xl font-bold text-green-400">40%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
