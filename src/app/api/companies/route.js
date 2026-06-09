import { NextResponse } from "next/server";
import { db } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    {
    }
    const allCompanies = await db.collection("companies").find({}).toArray();

    return NextResponse.json(
      {
        success: true,
        data: allCompanies,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
