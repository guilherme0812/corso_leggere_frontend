import { apiLeggere } from "@/app/_services/api";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const externalReq = await apiLeggere({
    method: "POST",
    url: `/login`,
    data: {
      email: "admin@exemplo.com",
      password: "senha_segura",
    },
  }).catch((error: any) => {
    return error.response;
  });

  return NextResponse.json({ ...externalReq.data, env: process.env.LEGGERE_API_URL }, { status: externalReq.status });
}
