import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-white mb-3">
              Hire<span className="text-blue-500">Loop</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bridging the gap between job seekers and employers. Smart hiring,
              simplified.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Job Seekers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/seeker/saved"
                  className="hover:text-blue-400 transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/seeker/applications"
                  className="hover:text-blue-400 transition-colors"
                >
                  My Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Employers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard/recruiter/jobs/new"
                  className="hover:text-blue-400 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="hover:text-blue-400 transition-colors"
                >
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/recruiter"
                  className="hover:text-blue-400 transition-colors"
                >
                  Recruiter Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm">
            <Link
              href="/privacy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-400 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
