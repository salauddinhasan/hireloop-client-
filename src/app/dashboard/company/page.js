"use client";

import React, { useState, useEffect, Suspense } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function CompanyFormContent() {
  const [formData, setFormData] = useState({
    companyName: "",
    logo: "",
    website: "",
    location: "",
    about: "",
    industry: "Technology",
    companySize: "1-10 Employees",
    officialEmail: "",
    foundedIn: "",
    linkedin: "",
    twitter: "",
  });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCompany = localStorage.getItem("active_edit_company");
      if (savedCompany) {
        setIsEditing(true);
        setFormData(
          JSON.deserialize
            ? JSON.deserialize(savedCompany)
            : JSON.parse(savedCompany),
        );
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.companyName.trim() || !formData.location.trim()) {
      toast.error("Company Name and Location are required! ⚠️");
      return;
    }

    setSaving(true);
    try {
      const url =
        isEditing && formData._id
          ? `http://localhost:5000/api/companies/${formData._id}`
          : "http://localhost:5000/api/companies";

      const method = isEditing && formData._id ? "PUT" : "POST";

      let finalUserId = formData.userId;
      if (!(isEditing && formData._id) && typeof window !== "undefined") {
        finalUserId = localStorage.getItem("current_recruiter_id");
      }

 
      const payload =
        isEditing && formData._id
          ? formData
          : { ...formData, userId: finalUserId || "default_recruiter" };

      console.log("Sending data to Express Server:", url, payload);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // এক্সপ্রেসকে জেসন রেসপন্স পাঠাতে বাধ্য করা হলো
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success || result.insertedId) {
        toast.success(
          isEditing && formData._id
            ? "Server specifications updated! 🚀"
            : "Brand infrastructure created! 🚀",
        );
        if (typeof window !== "undefined") {
          localStorage.removeItem("active_edit_company");
        }
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(
          result.error || result.message || "Server processing failed",
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error, sync aborted");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-400 font-sans py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#111217] border border-white/[0.06] rounded-2xl shadow-2xl p-8 md:p-10">
        <div className="border-b border-white/[0.06] pb-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {isEditing
                ? "⚡ Modify Enterprise Node Details"
                : "Deploy New Corporate Identity"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Fill all operational parameters to sync with global server index.
            </p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              01. Core Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
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
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-4 border-t border-white/[0.04]">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              02. Corporate Data Matrix
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
                  Founded In Year
                </label>
                <input
                  type="text"
                  name="foundedIn"
                  value={formData.foundedIn}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
              <div className="form-control">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  HQ Node Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
              <div className="form-control sm:col-span-3">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  Official Ops Email
                </label>
                <input
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-4 border-t border-white/[0.04]">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              03. Digital Network Hubs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  Website URI
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
              <div className="form-control">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  LinkedIn Target
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
              <div className="form-control">
                <label className="text-xs font-medium text-gray-400 mb-2">
                  Twitter Node
                </label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none h-11"
                />
              </div>
            </div>
          </div>

          <div className="form-control w-full pt-4 border-t border-white/[0.04]">
            <label className="text-xs font-medium text-gray-400 mb-2">
              Corporate Profile Manifesto
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full bg-[#17191f] border-white/[0.08] text-white text-sm rounded-xl focus:border-[#4d46ff] focus:outline-none resize-none p-4"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className={`btn w-full text-white font-medium rounded-xl border-none h-12 transition-all duration-200 shadow-lg ${isEditing ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/10" : "bg-[#4d46ff] hover:bg-[#3d36ef] shadow-[#4d46ff]/10"}`}
            >
              {saving ? (
                <span>Syncing with Database Cluster...</span>
              ) : (
                <span>
                  {isEditing
                    ? "⚡ Commit Structural Updates"
                    : "Deploy Enterprise Target"}
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RecruiterCompanyPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-xs text-gray-500">
          Connecting Database Server Node...
        </div>
      }
    >
      <CompanyFormContent />
    </Suspense>
  );
}
