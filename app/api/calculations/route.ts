import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Calculation } from "@/models";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ calculations: [] });
    }
    const calculations = await Calculation.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ calculations });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch calculations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ message: "Saved locally (database URI not set)" });
    }
    const newCalc = await Calculation.create(body);
    return NextResponse.json({ calculation: newCalc }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 });
  }
}
