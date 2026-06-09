"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CompanyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await fetch("/api/companies");
        const result = await res.json();
        if (result.success && result.data) {
          const foundCompany = result.data.find((c) => c._id === id);
          setCompany(foundCompany || null);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCompanyDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-[#4d46ff]"></span>
      </div>
    );
  if (!company)
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Company not found, Boss!</p>
        <button
          onClick={() => router.push("/companies")}
          className="btn btn-sm bg-[#4d46ff] text-white mt-4 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#090a0c] text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner Card */}
        <div className="bg-[#121316] border border-white/[0.04] rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.companyName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-500">
                  {company.companyName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-center sm:text-left space-y-2 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {company.companyName}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    📍 {company.location} •{" "}
                    <span className="text-[#4d46ff] font-medium">
                      {company.industry || "Technology"}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#4d46ff] text-white font-semibold px-4 py-2.5 rounded-xl"
                    >
                      Visit Website ↗
                    </a>
                  )}
                  <button
                    onClick={() => router.push("/companies")}
                    className="text-xs bg-white/[0.03] text-white px-4 py-2.5 rounded-xl border border-white/[0.05]"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#121316] border border-white/[0.04] p-4 rounded-xl text-center">
            <span className="text-xs text-gray-500 block">Company Size</span>
            <span className="text-sm font-bold text-white mt-1 block">
              {company.companySize || "1-10 Employees"}
            </span>
          </div>
          <div className="bg-[#121316] border border-white/[0.04] p-4 rounded-xl text-center">
            <span className="text-xs text-gray-500 block">Industry</span>
            <span className="text-sm font-bold text-[#4d46ff] mt-1 block truncate">
              {company.industry || "Technology"}
            </span>
          </div>
          <div className="bg-[#121316] border border-white/[0.04] p-4 rounded-xl text-center">
            <span className="text-xs text-gray-500 block">Founded In</span>
            <span className="text-sm font-bold text-white mt-1 block">
              {company.foundedIn || "N/A"}
            </span>
          </div>
          <div className="bg-[#121316] border border-white/[0.04] p-4 rounded-xl text-center">
            <span className="text-xs text-gray-500 block">HQ Location</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block truncate">
              {company.location}
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#121316] border border-white/[0.04] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/[0.02]">
              About Company
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {company.about || "No detailed description available."}
            </p>
          </div>

          <div className="bg-[#121316] border border-white/[0.04] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/[0.02]">
              Corporate Meta
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 block">Official Email</span>
                <span className="text-gray-300 font-medium block mt-0.5 break-all">
                  {company.officialEmail || "Not Disclosed"}
                </span>
              </div>
            </div>

            {(company.linkedin || company.twitter) && (
              <div className="pt-3 border-t border-white/[0.03] space-y-2">
                <span className="text-xs text-gray-500 block">
                  Social Presences
                </span>
                <div className="flex flex-col gap-2">
                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-[#18191d] rounded-xl border border-white/[0.04] text-xs text-gray-300 hover:text-white"
                    >
                      🔵 LinkedIn Profile ↗
                    </a>
                  )}
                  {company.twitter && (
                    <a
                      href={company.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-[#18191d] rounded-xl border border-white/[0.04] text-xs text-gray-300 hover:text-white"
                    >
                      ⚫ Twitter / X ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
