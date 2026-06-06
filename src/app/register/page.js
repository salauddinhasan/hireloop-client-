"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isSuccessful = false;

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/dashboard",
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data) {
        alert("Registration Successful!");
        isSuccessful = true;
      }
    } catch (err) {
      alert("Something went wrong!");
    }

    if (isSuccessful) {
      router.push("/dashboard");
    }
  };
  return (
    <section className="w-full  bg-[#070708] text-white flex items-center justify-center py-10 px-4 relative">
      {/* HeroUI v3 Glowing Spotlight (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#4d46ff]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Register Card */}
      <div className="w-full max-w-sm bg-[#0d0e12]/60 border border-white/[0.06] rounded-2xl p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-1">
            Get Started
          </h2>
          <p className="text-gray-400 text-xs">
            Create a new account to continue
          </p>
        </div>

        {/* 1. Google Button (Top Priority as requested) */}
        <button className="w-full flex items-center justify-center gap-2.5 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition-all text-xs tracking-wide shadow-sm mb-5">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.57 14.96 1 12 1 7.35 1 3.42 3.65 1.5 7.5l3.8 2.95C6.23 7.02 8.9 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.25c0-.82-.07-1.62-.2-2.38H12v4.5h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.7-4.94 3.7-8.57z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.55c-.24-.72-.38-1.5-.38-2.3c0-.8.14-1.58.38-2.3L1.5 7.02C.54 8.95 0 11.1 0 13.37c0 2.27.54 4.42 1.5 6.35l3.8-3.17z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.1.74-2.5 1.18-4.26 1.18-3.1 0-5.77-1.98-6.7-4.96l-3.8 2.95C3.42 20.35 7.35 23 12 23z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-5">
          <div className="flex-1 border-t border-white/[0.04]"></div>
          <span className="px-3 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            or
          </span>
          <div className="flex-1 border-t border-white/[0.04]"></div>
        </div>

        {/* Form Inputs (Name, Email, Password) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4d46ff] focus:ring-1 focus:ring-[#4d46ff] transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4d46ff] focus:ring-1 focus:ring-[#4d46ff] transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-gray-400 tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              className="w-full bg-[#131418] border border-white/[0.06] rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#4d46ff] focus:ring-1 focus:ring-[#4d46ff] transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#4d46ff] hover:bg-[#3f38e0] text-white font-semibold py-3 rounded-xl transition-all text-xs mt-2 shadow-[0_4px_25px_rgba(77,70,255,0.25)]"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-[11px] mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#4d46ff] hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
