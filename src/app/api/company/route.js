// src/app/api/company/route.js এর ভেতরের GET মেথডটি এইরকম হবে:

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "recruiter") {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 },
      );
    }

    const loginUserId = session.user.id;

    const myCompanies = await db
      .collection("companies")
      .find({ userId: loginUserId })
      .toArray();

    return NextResponse.json(
      { success: true, data: myCompanies },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await req.json();

    const {
      companyName,
      logo,
      website,
      location,
      about,
      industry,
      companySize,
      officialEmail,
      foundedIn,
      linkedin,
      twitter,
    } = body;

    if (!companyName || !location) {
      return NextResponse.json(
        { error: "Company name and location are required" },
        { status: 400 },
      );
    }

    {
      /* 🎯 এখানে insertOne দেওয়া হয়েছে যাতে প্রতিবার নতুন ইউনিক কার্ড তৈরি হয় */
    }
    const result = await db.collection("companies").insertOne({
      companyName,
      logo,
      website,
      location,
      about,
      industry: industry || "Technology",
      companySize: companySize || "1-10 Employees",
      officialEmail,
      foundedIn,
      linkedin,
      twitter,
      userId, // ট্র্যাক রাখার জন্য যে এই কোম্পানিটি এই রিক্রুটারের
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Company profile created!", data: result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
