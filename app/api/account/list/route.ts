
import { request } from "@/app/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_FORWARDE_EMAIL_API_KEY!!;
    const apiEndpoint =
      process.env.NEXT_PUBLIC_FORWARDE_BASE_URL!! + "/v1/account";
    console.log(apiKey);
    console.log(apiEndpoint); 
    const response = await request(
      apiKey as string,
      apiEndpoint,
      null,
      "GET"
    );
    console.log(response);
    const data = response
    const resp = { error: null, message: "Account list successfully", data };
    return NextResponse.json(resp, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
