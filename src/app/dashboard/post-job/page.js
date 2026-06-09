"use client";

import React, { useState } from "react";

export default function PostJobPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Job posted successfully, boss! 🎉");
        // ফর্ম রিসেট করা
        setFormData({
          title: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "Full-Time",
          description: "",
        });
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Server error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Post a New Job
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details to look for the perfect candidate.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-[#090a0c] border border-white/[0.05] p-8 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Job Title */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. HireLoop BD"
              className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote / Sylhet"
              className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400">
              Salary ($)
            </label>
            <input
              type="number"
              name="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 1200"
              className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
            />
          </div>

          {/* Job Type */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400">
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="bg-[#090a0c] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-400">
            Job Description
          </label>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the roles and responsibilities..."
            className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4d46ff] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-[#4d46ff] hover:bg-[#3b35db] text-white text-sm font-bold rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Publish Job Circular"}
          </button>
        </div>
      </form>
    </div>
  );
}
