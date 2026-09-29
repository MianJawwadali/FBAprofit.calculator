import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AppConfig } from "@/models";
import { DEFAULT_CONFIG } from "@/lib/calculator";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ config: DEFAULT_CONFIG });
    }
    let config = await AppConfig.findOne();
    if (!config) {
      config = await AppConfig.create(DEFAULT_CONFIG);
    }
    return NextResponse.json({ config });
  } catch (error) {
    return NextResponse.json({ config: DEFAULT_CONFIG });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ error: "Database connection unavailable" }, { status: 500 });
    }
    let config = await AppConfig.findOne();
    if (!config) {
      config = await AppConfig.create({ ...DEFAULT_CONFIG, ...body, lastUpdated: new Date() });
    } else {
      Object.assign(config, body, { lastUpdated: new Date() });
      await config.save();
    }
    return NextResponse.json({ config, message: "Global fee rates updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}
