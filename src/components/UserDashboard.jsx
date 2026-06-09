"use client";

import React, { useEffect, useState } from "react";
import ApplyButton from "@/components/ApplyButton";
import { authClient } from "@/lib/auth-client"; // 🌟 Better Auth client wrapper import korlam

export default function UserDashboard() {
  const [jobs, setJobs] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌟 Better Auth client hook directly session current data provide korbe
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  // 📡 ১. এক্সপ্রেস সার্ভার থেকে সব জব এবং ইউজারের ওল্ড অ্যাপ্লিকেশন নিয়ে আসা
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // সব জবের ডাটা লোড
        const jobsRes = await fetch("http://127.0.0.1:5000/jobs");
        const jobsData = await jobsRes.json();
        setJobs(jobsData);

        // ইউজার অলরেডি কোন কোন জবে অ্যাপ্লাই করেছে তার ডাটা লোড
        if (userEmail) {
          const appRes = await fetch(
            `http://127.0.0.1:5000/applications/${userEmail}`,
          );
          const appData = await appRes.json();
          setUserApplications(appData);
        }
      } catch (error) {
        console.error("Error loading candidate dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Session loading complete holei database verification fire hobe
    if (!isPending) {
      loadDashboardData();
    }
  }, [userEmail, isPending]);

  // 🌟 applied job IDs filter and string conversion
  const appliedJobIds = new Set(
    userApplications.map((app) => app.jobId?.toString()),
  );

  if (loading || isPending) {
    return (
      <div className="text-sm text-gray-500 animate-pulse p-8">
        Loading available opportunities, boss...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-wide">
          Explore Opportunities 🎯
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Find your dream job from the latest verified tech openings.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/[0.06] rounded-2xl bg-[#090a0c]/50">
          <p className="text-gray-400 font-medium">
            No jobs available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {jobs.map((job) => {
            // Check condition with backend application dataset
            const isAlreadyApplied = appliedJobIds.has(job._id?.toString());

            return (
              <div
                key={job._id}
                className="p-6 bg-[#090a0c] border border-white/[0.05] rounded-2xl flex flex-col justify-between gap-6 hover:border-white/[0.08] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#807bff] bg-[#4d46ff]/10 px-2.5 py-1 rounded-md border border-[#4d46ff]/20 uppercase">
                      {job.jobType || "Full-Time"}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {job.salary ? `$${job.salary}` : "Negotiable"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {job.companyName}
                    </p>
                    <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                  <span className="text-xs text-gray-500">
                    {job.location || "Remote"}
                  </span>

                  <ApplyButton
                    jobId={job._id}
                    jobTitle={job.title}
                    userEmail={userEmail}
                    isAlreadyApplied={isAlreadyApplied}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
