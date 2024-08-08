import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! + `/v1/emails/${id}`;

    const response = await request(apiKey as string, apiEndpoint, {}, "GET");
    const data = response;
    const resp = { error: null, message: "Email retrieved successfully", data };
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
