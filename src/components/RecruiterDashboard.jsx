"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RecruiterDashboard() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Alex Sterling";

  const currentUserId = session?.user?.id;

  const router = useRouter();
  const [myCompanies, setMyCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const fetchMyCompanies = async () => {
    if (!currentUserId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/companies?userId=${currentUserId}`,
        {
          cache: "no-store",
        },
      );
      const result = await res.json();
      if (result.success) {
        setMyCompanies(result.data || result);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // 🎯 currentUserId চেঞ্জ বা লোড হওয়া মাত্রই ডাটা ফেচ কল হবে
  useEffect(() => {
    if (currentUserId) {
      fetchMyCompanies();
      localStorage.setItem("current_recruiter_id", currentUserId);
    }
  }, [currentUserId]);

  const handleDeleteClick = async (id, name) => {
    if (!id) {
      toast.error("Invalid Entity ID! Cannot target document. ⚠️");
      return;
    }

    if (
      !confirm(
        `Are you sure you want to delete "${name}" permanently, Boss? ⚠️`,
      )
    )
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/companies/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Entity removed from server successfully! ");
        setMyCompanies((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(result.message || "Server deletion failed");
      }
    } catch (error) {
      
      toast.error("Network error, sync failed");
    }
  };

  const handleEditRedirect = (company) => {
    localStorage.setItem("active_edit_company", JSON.stringify(company));
    router.push(`/dashboard/company?edit=true`);
  };

  return (
    <div className="space-y-8 text-gray-300">
      {/* 👋 WELCOME HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          Welcome back, {userName}
        </h1>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-[#121316] border border-white/[0.04] rounded-2xl flex flex-col justify-between h-44 hover:border-white/[0.08] transition-all">
          <div className="w-10 h-10 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              Total Job Posts
            </p>
            <p className="text-3xl font-semibold text-white mt-1">48</p>
          </div>
        </div>

        <div className="p-6 bg-[#121316] border border-white/[0.04] rounded-2xl flex flex-col justify-between h-44 hover:border-white/[0.08] transition-all">
          <div className="w-10 h-10 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              Total Applicants
            </p>
            <p className="text-3xl font-semibold text-white mt-1">1,284</p>
          </div>
        </div>

        <div className="p-6 bg-[#121316] border border-white/[0.04] rounded-2xl flex flex-col justify-between h-44 hover:border-white/[0.08] transition-all">
          <div className="w-10 h-10 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              Active Jobs
            </p>
            <p className="text-3xl font-semibold text-white mt-1">18</p>
          </div>
        </div>

        <div className="p-6 bg-[#121316] border border-white/[0.04] rounded-2xl flex flex-col justify-between h-44 hover:border-white/[0.08] transition-all">
          <div className="w-10 h-10 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">
              Jobs Closed
            </p>
            <p className="text-3xl font-semibold text-white mt-1">32</p>
          </div>
        </div>
      </div>

{/* company ariay */}
      <div className="space-y-5">
        <div className="flex justify-between items-center border-b border-white/[0.04] pb-3">
          <div>
            <h2 className="text-xl font-medium text-white tracking-tight">
              Verified Enterprise Hub
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Live data ecosystems sync directly with your database server.
            </p>
          </div>
          <span className="text-xs font-mono bg-[#4d46ff]/10 border border-[#4d46ff]/20 text-[#7c75ff] px-3 py-1 rounded-xl">
            Total Entities: {myCompanies.length}
          </span>
        </div>

        {loadingCompanies ? (
          <div className="flex justify-center items-center py-20 bg-[#121316]/30 border border-white/[0.03] rounded-2xl">
            <span className="loading loading-spinner text-[#4d46ff] loading-md"></span>
          </div>
        ) : myCompanies.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/[0.04] rounded-2xl bg-[#121316]/10">
            <h4 className="text-sm text-gray-400">No Enterprise Nodes Found</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {myCompanies.map((company) => (
              <div
                key={company._id}
                className="bg-[#121316] border border-white/[0.04] hover:border-white/[0.09] rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between shadow-2xl hover:shadow-[#4d46ff]/5"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4d46ff]/5 to-transparent rounded-bl-full pointer-events-none group-hover:from-[#4d46ff]/10 transition-all duration-300" />
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.companyName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-mono font-bold text-[#4d46ff]">
                          {company.companyName?.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold text-white tracking-tight truncate group-hover:text-[#4d46ff] transition-colors">
                          {company.companyName}
                        </h3>
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md shrink-0">
                          {company.industry || "General"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>
                          {company.companySize || "1-10 Employees"}
                        </span>
                        <span>•</span>
                        <span>Founded: {company.foundedIn || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {company.about ||
                      "No organizational overview description synchronized yet."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white/[0.01] border border-white/[0.03] p-3 rounded-xl font-mono text-xs text-gray-500 mb-2">
                    <div className="truncate">
                       HQ:{" "}
                      <span className="text-gray-300">{company.location}</span>
                    </div>
                    <div className="truncate sm:text-right">
                       {company.officialEmail || "no-ops@email.com"}
                    </div>
                    <div className="truncate flex items-center gap-1.5 pt-1 border-t border-white/[0.02] col-span-1 sm:col-span-2 text-[11px]">
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          className="text-blue-400 hover:underline"
                        >
                           Website
                        </a>
                      )}
                      {company.linkedin && (
                        <a
                          href={company.linkedin}
                          target="_blank"
                          className="text-indigo-400 hover:underline"
                        >
                           LinkedIn
                        </a>
                      )}
                      {company.twitter && (
                        <a
                          href={company.twitter}
                          target="_blank"
                          className="text-sky-400 hover:underline"
                        >
                           Twitter
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => handleEditRedirect(company)}
                    className="flex-1 bg-white/[0.02] hover:bg-[#4d46ff]/10 hover:text-white border border-white/[0.05] hover:border-[#4d46ff]/30 text-xs font-medium py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-gray-300"
                  >
                     Settings & Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteClick(company._id, company.companyName)
                    }
                    className="flex-1 bg-white/[0.01] hover:bg-rose-500/10 hover:text-rose-400 border border-white/[0.04] hover:border-rose-500/30 text-xs font-medium py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 text-gray-400"
                  >
                     Terminate Entity
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
