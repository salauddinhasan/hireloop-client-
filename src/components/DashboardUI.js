"use client";

import React, { useState } from "react";
// import Link from "none";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardUI({
  children,
  userName,
  userRole,
  userImage,
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 🚪 লগআউট ফাংশন
  const handleLogout = async () => {
    try {
      // বস্, এখানে আপনার Better Auth ক্লায়েন্টের লগআউট মেথড ডাকবেন:
      // await authClient.signOut();
      alert("Logging out...");
      window.location.href = "/login"; // বা আপনার ইচ্ছা অনুযায়ী রাউট
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => pathname === path;

  // 🔗 সাইডবার লিংকসমূহ
  const links =
    userRole === "recruiter"
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z",
          },
          {
            href: "/dashboard/company",
            label: "My Company",
            icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
          },
          {
            href: "/dashboard/manage-jobs",
            label: "Manage Jobs",
            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
          },
          {
            href: "/dashboard/post-job",
            label: "Post a Job",
            icon: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            href: "/dashboard/applicants",
            label: "Applications",
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          },
        ]
      : [
          {
            href: "/dashboard",
            label: "Browse Jobs",
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
          },
          {
            href: "/dashboard/applied",
            label: "Applied Jobs",
            icon: "M9 5H7a2 2 0 00-2-2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          },
          {
            href: "/dashboard/profile",
            label: "My Profile",
            icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
          },
        ];

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col justify-between h-full pt-4 pb-6 px-4 select-none">
      <div>
       
        <div className="px-4 mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-white/[0.08] bg-neutral-800 flex items-center justify-center shrink-0">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-white uppercase">
                  {userName.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-semibold text-white tracking-wide truncate">
                {userName}
              </span>
              <span className="text-[11px] text-gray-500 capitalize font-medium mt-0.5">
                {userRole === "recruiter" ? "Recruiter" : "Job Seeker"}
              </span>
            </div>
          </div>
          <div>
            <span className="inline-block text-[9px] font-bold tracking-wider text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-[4px] uppercase">
              Premium Account
            </span>
          </div>
        </div>

        {/* 📂 লিংকসমূহ */}
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive(link.href)
                  ? "bg-white/[0.04] text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <svg
                className={`w-[18px] h-[18px] ${isActive(link.href) ? "text-white" : "text-gray-500 group-hover:text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={link.icon}
                />
              </svg>
              <span className="text-[13px] font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

       
      <div className="px-4 border-t border-white/[0.04] pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all font-medium text-[13px]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0e12] text-gray-300 antialiased font-sans">
     
      <header className="h-20 bg-[#090a0c] border-b border-white/[0.04] px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 gap-6 select-none">
        <div className="flex items-center gap-3 w-auto md:w-[236px] shrink-0">
          {/* 📱 মোবাইল হ্যামবার্গার */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-gray-400 hover:text-white bg-white/[0.02] border border-white/[0.05] rounded-xl transition-all md:hidden block"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <a
            href="/dashboard"
            className="text-xl md:text-2xl font-black tracking-tight text-white"
          >
            Hire<span className="text-[#4d46ff]">Loop</span>
          </a>
        </div>

        {/* 🔍 ডেক্সটপ সার্চবার */}
        <div className="flex-1 max-w-4xl relative hidden md:block">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search applications, jobs, or talent..."
            className="w-full bg-[#121316] border border-white/[0.04] rounded-xl pl-12 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-white/[0.08] transition-all"
          />
        </div>

        {/* 🔔 প্রোফাইল ও নোটিফিকেশন */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-white/[0.02] border border-white/[0.04] rounded-xl">
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            <svg
              className="w-[18px] h-[18px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3 border-l border-white/[0.05] pl-4 md:pl-6">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-white tracking-wide">
                {userName}
              </p>
              <p className="text-[10px] text-gray-600 mt-0.5 capitalize">
                {userRole === "recruiter"
                  ? "Recruiter Panel"
                  : "Candidate Panel"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/[0.08] bg-neutral-800 flex items-center justify-center">
              {userImage ? (
                <img
                  src={userImage}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-white uppercase">
                  {userName.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 📁 মেইন কন্টেন্ট বডি */}
      <div className="flex flex-1 relative">
        {/* 💻 ২. ডেক্সটপ সাইডবার (টপ সার্চবারের ঠিক নিচ থেকে শুরু এবং বামে ফিক্সড) */}
        <aside className="w-[260px] bg-[#090a0c] hidden md:block border-r border-white/[0.02] sticky top-20 h-[calc(100vh-80px)] z-40 overflow-y-auto">
          {renderSidebarContent(false)}
        </aside>

        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileOpen(false)}
            ></div>

            <aside className="relative flex flex-col w-[260px] bg-[#090a0c] border-r border-white/[0.04] h-full shadow-2xl z-50 animate-slide-in">
              <div className="p-6 pb-0 flex items-center justify-between">
                <h2 className="text-xl font-black text-white">
                  Hire<span className="text-[#4d46ff]">Loop</span>
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-gray-400 hover:text-white p-2 text-lg"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto mt-4">
                {renderSidebarContent(true)}
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 p-6 md:p-8 bg-[#0a0b0d] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
