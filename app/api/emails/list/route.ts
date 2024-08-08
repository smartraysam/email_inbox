import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! + "/v1/emails?page=" + page;

    const response = await request(
      apiKey as string,
      apiEndpoint,
      null,
      "GET"
    );
    const data = response;
    const resp = { error: null, message: "Email list successfully", data };
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
