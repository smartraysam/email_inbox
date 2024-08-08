import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const from = body.email;
  const to = body.password;
  const subject = body.email;
  const text = body.password;

  if (!from || !to || !subject || !text) {
    return NextResponse.json(
      { error: "Parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! + "/v1/emails";

    const payload = { from, to, subject, text };
    const response = await request(
      apiKey as string,
      apiEndpoint,
      payload,
      "POST"
    );
    const data = { email: response.email, id: response.id };
    const resp = { error: null, message: "Email send successfully", data };
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
