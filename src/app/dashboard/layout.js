import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import DashboardUI from "@/components/DashboardUI";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userRole = user?.role || "user";
  const userName = user?.name || "User";
  const userImage = user?.image || null;

  return (
    <DashboardUI userName={userName} userRole={userRole} userImage={userImage}>
      {children}
    </DashboardUI>
  );
}
