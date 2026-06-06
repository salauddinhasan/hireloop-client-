import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, db } from "@/lib/auth";
import UserDashboard from "@/components/UserDashboard";
import RecruiterDashboard from "@/components/RecruiterDashboard";

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

  const jobsData = await db
    .collection("jobs")
    .find({ status: "active" })
    .sort({ createdAt: -1 })
    .toArray();

  const jobs = jobsData.map((job) => ({
    ...job,
    _id: job._id.toString(),
    recruiterId: job.recruiterId.toString(),
  }));

  const userApplications = await db
    .collection("applications")
    .find({ applicantId: new (require("mongodb").ObjectId)(user.id) })
    .toArray();

  const appliedJobIds = userApplications.map((app) => app.jobId.toString());

  return (
    <UserDashboard user={user} jobs={jobs} appliedJobIds={appliedJobIds} />
  );
}
