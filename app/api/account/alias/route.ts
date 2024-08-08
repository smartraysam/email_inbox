// Adjust the path as needed
import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const name = body.name;
  const recipients = body.recipients;

  if (!name || !recipients) {
    return NextResponse.json(
      { error: "Required parameters are missing" },
      { status: 400 }
    );
  }
  const description = name + " alias";
  const label = `catch ${name} emails`;
  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! +
      "/v1/domains/breezeflow.io/aliases";

    const payload = { name, recipients, description, label, is_enabled:true };
    const response = await request(
      apiKey as string,
      apiEndpoint,
      payload,
      "POST"
    );
    const data = { email: response.email, id: response.id };
    const resp = { error: null, message: "Alias created successfully", data };
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
