import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import RecruiterDashboard from "@/components/RecruiterDashboard";
import UserDashboard from "@/components/UserDashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userRole = session?.user?.role || "user";

  if (userRole === "recruiter") {
    return <RecruiterDashboard />;
  }

  return <UserDashboard />;
}
