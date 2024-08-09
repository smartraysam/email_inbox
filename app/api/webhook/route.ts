import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try { 
    const resp={error: null, message: "Wehbook received", data:body};
    console.log(resp);
    return NextResponse.json({msg:"webhook sent"}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
