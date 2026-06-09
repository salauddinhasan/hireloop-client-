"use client";
import React from "react";

export default function CompanyCard({ company, onEdit, onDelete }) {
  return (
    <div className="bg-[#16181f] border border-white/[0.05] rounded-xl p-5 hover:border-[#4d46ff]/30 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center overflow-hidden shrink-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.companyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'><rect x='2' y='2' width='20' height='20' rx='2'></rect></svg>";
                }}
              />
            ) : (
              <span className="text-sm font-mono font-bold text-gray-500">
                {company.companyName?.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase bg-white/[0.03] border border-white/[0.06] text-purple-400 px-2 py-1 rounded-md">
            {company.industry || "General"}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white group-hover:text-[#4d46ff] transition-colors line-clamp-1">
          {company.companyName}
        </h3>
        <p className="text-xs text-gray-500 mt-1">📍 {company.location}</p>
        {company.about && (
          <p className="text-xs text-gray-400 mt-3 line-clamp-2 leading-relaxed">
            {company.about}
          </p>
        )}
      </div>

      {/* অ্যাকশন বাটনসমূহ */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.03]">
        <button
          type="button"
          onClick={() => onEdit(company)}
          className="flex-1 bg-white/[0.03] hover:bg-amber-600/10 hover:text-amber-500 border border-white/[0.06] text-xs text-gray-300 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
        >
          📝 Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(company._id, company.companyName)}
          className="flex-1 bg-white/[0.03] hover:bg-rose-600/10 hover:text-rose-500 border border-white/[0.06] text-xs text-gray-400 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
