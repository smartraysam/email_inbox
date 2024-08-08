 // Adjust the path as needed
import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email = body.email;
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! + "/v1/account";

    const payload = { email, password };
    const response = await request(apiKey as string, apiEndpoint, payload, "POST");
    const data= {email: response.email, id: response.id};
    const resp={error: null, message: "Email created successfully",data};
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
