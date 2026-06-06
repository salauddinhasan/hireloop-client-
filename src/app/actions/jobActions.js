"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function createJobAction(formData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "recruiter") {
      return {
        success: false,
        error: "Unauthorized! Only recruiters can post jobs.",
      };
    }

    const title = formData.get("title");
    const companyName = formData.get("companyName");
    const location = formData.get("location");
    const salary = formData.get("salary");
    const jobType = formData.get("jobType");
    const description = formData.get("description");

    if (!title || !companyName || !location || !salary || !description) {
      return { success: false, error: "All fields are required!" };
    }

    const newJob = {
      recruiterId: new ObjectId(session.user.id),
      title,
      companyName,
      location,
      salary,
      jobType,
      description,
      status: "active",
      createdAt: new Date(),
    };

    const result = await db.collection("jobs").insertOne(newJob);

    if (result.insertedId) {
      return { success: true, message: "Job posted successfully!" };
    }

    return { success: false, error: "Failed to save job to database." };
  } catch (error) {
    console.error("Job Post Error:", error);
    return { success: false, error: "Something went wrong!" };
  }
}
