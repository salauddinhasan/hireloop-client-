"use client";
import React from "react";

export default function CompanyForm({
  formData,
  handleChange,
  handleSubmit,
  saving,
  isEditing,
  cancelEdit,
}) {
  return (
    <div className="bg-[#111217] border border-white/[0.06] rounded-2xl shadow-2xl p-8 md:p-10 relative">
      <div className="border-b border-white/[0.06] pb-6 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditing ? "Update Company Profile" : "Create Company Profile"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Provide official credentials to set up your corporate entity.
          </p>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="text-xs bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 px-3 py-1.5 rounded-lg border border-white/[0.08] transition-all"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* 01. Core Info */}
        <div className="space-y-5">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            01. Core Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Company Name <span className="text-purple-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Stripe, Inc."
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Industry Segment
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="select select-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              >
                <option value="Technology">Technology & Software</option>
                <option value="E-commerce">E-commerce & Logistics</option>
                <option value="Finance">Fintech & Banking</option>
                <option value="Healthcare">Healthcare & Biotech</option>
                <option value="Education">EdTech & Training</option>
              </select>
            </div>
            <div className="form-control md:col-span-2">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Logo Asset URL
              </label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://domain.com/cdn/logo.png"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* 02. Corporate Structure */}
        <div className="space-y-5 pt-4 border-t border-white/[0.04]">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            02. Corporate Structure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Global Team Size
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="select select-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              >
                <option value="1-10 Employees">1 - 10 Employees</option>
                <option value="11-50 Employees">11 - 50 Employees</option>
                <option value="51-200 Employees">51 - 200 Employees</option>
                <option value="201-500 Employees">201 - 500 Employees</option>
                <option value="500+ Employees">500+ Global Talent</option>
              </select>
            </div>
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Founded In
              </label>
              <input
                type="text"
                name="foundedIn"
                value={formData.foundedIn}
                onChange={handleChange}
                placeholder="e.g. 2021"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                HQ Location <span className="text-purple-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              />
            </div>
            <div className="form-control sm:col-span-3">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Official Email
              </label>
              <input
                type="email"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                placeholder="ops@company.com"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
              />
            </div>
          </div>
        </div>

        {/* 03. Digital Ecosystem */}
        <div className="space-y-5 pt-4 border-t border-white/[0.04]">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            03. Digital Ecosystem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11 font-mono text-xs"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11 font-mono text-xs"
              />
            </div>
            <div className="form-control">
              <label className="text-xs font-medium text-gray-400 mb-2">
                Twitter / X
              </label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://x.com"
                className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* 04. Manifesto */}
        <div className="form-control w-full pt-4 border-t border-white/[0.04]">
          <label className="text-xs font-medium text-gray-400 mb-2">
            Company Overview & Manifesto
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
            placeholder="Outline your corporate mission..."
            className="textarea textarea-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none resize-none p-4"
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className={`btn w-full text-white font-medium rounded-xl border-none h-12 transition-all duration-200 shadow-lg ${isEditing ? "bg-amber-600 hover:bg-amber-700" : "bg-[#4d46ff] hover:bg-[#3d36ef]"}`}
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>
                {isEditing
                  ? "⚡ Update Company Details"
                  : "Save Company Profile"}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
