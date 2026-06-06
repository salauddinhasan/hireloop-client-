import React from "react";
import Link from "next/link";

const CtaBanner = () => {
  return (
    <section className="w-full bg-[#0d0e11] py-24 px-4 overflow-hidden relative">
      {/* Background Glow & Grid Arc Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-600/20 to-purple-600/0 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Arc Lines Overlay (CSS Radial-Grid) */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at top, transparent 40%, #0d0e11 80%),
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto mb-6">
          Your next role is <br /> already looking for you
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base font-light max-w-lg mx-auto mb-10 tracking-wide">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all text-sm tracking-wide text-center"
          >
            Create a free account
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto bg-[#16181c]/60 border border-white/10 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all text-sm tracking-wide text-center"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
