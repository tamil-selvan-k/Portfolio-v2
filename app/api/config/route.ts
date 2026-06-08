import { NextResponse } from "next/server";

export async function GET() {
  const url = (process.env.vitebackendurl || 
               process.env.VITE_BACKEND_URL || 
               process.env.NEXT_PUBLIC_VITE_BACKEND_URL || "").trim();
  return NextResponse.json({ vitebackendurl: url });
}
