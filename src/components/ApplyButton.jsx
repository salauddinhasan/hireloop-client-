"use client";

import React, { useState } from "react";

export default function ApplyButton({
  jobId,
  jobTitle,
  userEmail,
  isAlreadyApplied,
}) {
  // যদি শুরু থেকেই ডাটাবেজে অ্যাপ্লাই করা থাকে, তবে স্টেট true হবে
  const [applied, setApplied] = useState(isAlreadyApplied);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (applied) return;
    if (!userEmail) {
      alert("Please login to apply for this job, boss!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: jobId,
          jobTitle: jobTitle,
          userEmail: userEmail, // 🌟 ইউজারের ইমেইলটা ডাটাবেজে ট্র্যাক রাখার জন্য পাঠালাম
          appliedAt: new Date(),
        }),
      });

      if (response.ok) {
        setApplied(true);
        alert(`Successfully applied for ${jobTitle}! 🎉`);
      } else {
        alert("Failed to apply. Please try again, boss!");
      }
    } catch (error) {
      console.error("Apply Error:", error);
      alert("Server error. Check your backend server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={loading || applied}
      className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-sm ${
        applied
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed"
          : loading
            ? "bg-white/[0.02] text-gray-500 border border-white/[0.04] cursor-wait"
            : "text-white bg-white/[0.04] hover:bg-[#4d46ff] border border-white/[0.08] hover:border-transparent"
      }`}
    >
      {loading ? "Applying..." : applied ? "✓ Applied" : "Apply Now"}
    </button>
  );
}
