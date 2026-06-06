import { headers } from "next/headers";
import { redirect } from "next/navigation";

import RecruiterDashboard from "@/components/RecruiterDashboard";
import UserDashboard from "@/components/UserDashboard";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  if (user.role === "recruiter") {
    return <RecruiterDashboard user={user} />;
  }

  return <UserDashboard user={user} />;
}
