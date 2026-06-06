"use client";

import React, { useState } from "react";
import { createJobAction } from "@/app/actions/jobActions"; // অ্যাকশন ইমপোর্ট করলাম

const RecruiterDashboard = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const response = await createJobAction(formData);

    setLoading(false);

    if (response.success) {
      alert(response.message);
      e.target.reset(); // ফর্মের সব ইনপুট খালি করে দেবে
    } else {
      alert(response.error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#070708] text-white">
      <div className="max-w-2xl mx-auto border border-white/[0.06] bg-[#0d0e11]/60 p-6 rounded-2xl backdrop-blur-xl">
        <h1 className="text-xl font-bold text-emerald-400 mb-1">
          Post a New Job
        </h1>
        <p className="text-gray-400 text-xs mb-6">
          Welcome, {user?.name}. Fill up the details to post a vacancy.
        </p>

        {/* Job Post Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Job Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. React Developer"
                className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Company Name</label>
              <input
                type="text"
                name="companyName"
                required
                placeholder="e.g. HireLoop Inc"
                className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Location</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Remote / Dhaka"
                className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Salary */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Salary Range</label>
              <input
                type="text"
                name="salary"
                required
                placeholder="e.g. $500 - $1000"
                className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Job Type */}
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400">Job Type</label>
              <select
                name="jobType"
                className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-[11px] text-gray-400">Job Description</label>
            <textarea
              name="description"
              rows="4"
              required
              placeholder="Describe the responsibilities and requirements..."
              className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2.5 rounded-xl transition-all text-xs disabled:opacity-50"
          >
            {loading ? "Posting Job..." : "Publish Job Vacancy"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
