"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 👈 আপনার Better Auth ক্লায়েন্ট ফাইলের সঠিক পাথটি দিবেন

const Navbar = () => {
  const router = useRouter();

  // 👤 Better Auth ক্লায়েন্ট-সাইড সেশন
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // 🚪 লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); // লগআউট হলে হোমপেজে পাঠাবে
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-[#0d0e11] py-4 px-4 flex justify-center">
      <nav className="w-full max-w-7xl bg-[#16181c]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] h-15 flex items-center justify-between px-6">
        {/* লোগো */}
        <Link
          href="/"
          className="flex items-center font-black text-2xl tracking-tight select-none cursor-pointer hover:opacity-95 transition-opacity"
        >
          <span className="text-[#0088ff]">hire</span>
          <span className="text-[#ff6600]">l</span>
          <span className="inline-flex items-center justify-center bg-gradient-to-tr from-[#0055ff] to-[#ff3300] text-white rounded-full w-5 h-5 mx-[1px] text-[10px] animate-spin-slow">
            ↻
          </span>
          <span className="text-[#ff6600]">p</span>
        </Link>

        {/* মেনু লিংকসমূহ */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/jobs"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="/companies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Company
            </Link>
            <Link
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="hidden md:block h-5 w-[1px] bg-white/10 mx-1"></div>

          
          {isPending ? (
            <span className="text-sm text-gray-500 animate-pulse">
              Loading...
            </span>
          ) : user ? (
            
            <button
              onClick={handleLogout}
              className="text-rose-500 hover:text-rose-400 text-sm font-semibold transition-colors"
            >
              Logout
            </button>
          ) : (
            
            <Link
              href="/login"
              className="text-[#7c4dff] hover:text-[#9e7bb5] text-sm font-semibold transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* 🎯 "Get Started" বাটন (যা সবসময় ফিক্সড থাকবে, কোনো চেঞ্জ হবে না) */}
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#4d46ff] to-[#6b66ff] text-white font-semibold px-6 py-3 rounded-xl shadow-[0_4px_20px_rgba(77,70,255,0.3)] hover:opacity-90 transition-all text-sm transform hover:-translate-y-[1px]"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
