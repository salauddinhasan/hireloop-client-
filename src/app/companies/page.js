"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PublicCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await fetch("/api/companies");
        const result = await res.json();

        if (result.success) {
          if (Array.isArray(result.data)) {
            setCompanies(result.data);
          } else if (result.data && typeof result.data === "object") {
            setCompanies([result.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a0c] text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Explore Top <span className="text-[#4d46ff]">Companies</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Discover verified companies posting active tech jobs and find your
            next dream workplace.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="text-center py-12 border border-white/[0.04] rounded-2xl bg-[#121316]">
            <p className="text-gray-500 text-sm">
              No companies registered yet, Boss!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-[#121316] border border-white/[0.04] rounded-2xl p-6 hover:border-white/[0.1] transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-gray-500">
                          {company.companyName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white group-hover:text-[#4d46ff] transition-colors">
                        {company.companyName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {company.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                    {company.about ||
                      "No description provided by the company yet."}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.02]">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      Visit Website ↗
                    </a>
                  ) : (
                    <span className="text-xs text-gray-600">No website</span>
                  )}
                  <Link
                    href={`/companies/${company._id}`}
                    className="text-xs font-semibold bg-white/[0.04] hover:bg-[#4d46ff] text-white px-4 py-2 rounded-xl border border-white/[0.04] hover:border-none transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
