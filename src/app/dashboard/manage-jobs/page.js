"use client";

import React, { useEffect, useState } from "react";

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📝 এডিটের জন্য স্টেটসমূহ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // 🌐 ১. সার্ভার থেকে সব জব লোড করা
  const fetchMyJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error loading manage-jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  // 🗑️ ২. জব ডিলিট করার হ্যান্ডলার
  const handleDelete = async (jobId, jobTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${jobTitle}", boss?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Job deleted successfully! 🗑️");
        setJobs(jobs.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // ✍️ ৩. এডিট বাটন ক্লিকের হ্যান্ডলার (মডাল ওপেন করবে)
  const openEditModal = (job) => {
    setEditingJob({ ...job }); // নির্দিষ্ট জবের ডাটা কপিকরে স্টেটে নিলাম
    setIsEditModalOpen(true);
  };

  // 💾 ৪. আপডেট ডাটা সার্ভারে সাবমিট করা
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:5000/jobs/${editingJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      if (res.ok) {
        alert("Job updated successfully, boss! 📝🎉");
        setIsEditModalOpen(false);
        // ফ্রন্টএন্ড স্টেট আপডেট করে দেওয়া যাতে রিলোড ছাড়া ডাটা চেঞ্জ হয়
        setJobs(jobs.map((j) => (j._id === editingJob._id ? editingJob : j)));
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-sm text-gray-500 animate-pulse p-8">
        Loading your workspace, boss...
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Manage Job Circulars
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review, edit, and manage all your published positions.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/[0.06] rounded-2xl bg-[#090a0c]/50">
          <p className="text-gray-400 font-medium">
            You haven't posted any jobs yet, boss.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#090a0c] border border-white/[0.05] rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.04] text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="p-5">Job Details</th>
                <th className="p-5">Location</th>
                <th className="p-5">Salary</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover:text-[#4d46ff] transition-colors">
                        {job.title}
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5">
                        {job.companyName}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300 font-medium">
                        {job.location}
                      </span>
                      <span className="text-[10px] text-[#807bff] font-semibold mt-0.5">
                        {job.jobType}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-xs font-bold text-emerald-400">
                      {job.salary ? `$${job.salary}` : "Negotiable"}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    {/* ✍️ এডিট বাটন */}
                    <button
                      onClick={() => openEditModal(job)}
                      className="text-xs font-semibold text-amber-400 hover:text-black bg-amber-500/10 hover:bg-amber-500 border border-amber-500/20 hover:border-transparent px-3 py-1.5 rounded-lg transition-all duration-300"
                    >
                      Edit
                    </button>
                    {/* 🗑️ ডিলিট বাটন */}
                    <button
                      onClick={() => handleDelete(job._id, job.title)}
                      className="text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-transparent px-3 py-1.5 rounded-lg transition-all duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔮 PREMIUM EDIT MODAL BACKGROUND */}
      {isEditModalOpen && editingJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#090a0c] border border-white/[0.08] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h2 className="text-lg font-bold text-white">
                Update Job Circular
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, title: e.target.value })
                  }
                  className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4d46ff]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editingJob.companyName}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4d46ff]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, location: e.target.value })
                    }
                    className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4d46ff]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1">
                    Salary ($)
                  </label>
                  <input
                    type="text"
                    value={editingJob.salary}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, salary: e.target.value })
                    }
                    className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4d46ff]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold block mb-1">
                    Job Type
                  </label>
                  <select
                    value={editingJob.jobType}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, jobType: e.target.value })
                    }
                    className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4d46ff]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-semibold block mb-1">
                  Description
                </label>
                <textarea
                  value={editingJob.description}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white h-24 resize-none focus:outline-none focus:border-[#4d46ff]"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-white/[0.02] text-gray-400 hover:text-white rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4d46ff] text-white hover:bg-[#3b35cc] rounded-xl text-xs font-semibold transition-all shadow-lg shadow-[#4d46ff]/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
