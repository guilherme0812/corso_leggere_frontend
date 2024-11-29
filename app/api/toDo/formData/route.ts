import { apiLeggere } from "@/app/_services/api";
import { getParams } from "@/app/_utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const geeToken = headersInstance.get("Gee-Token");

  const searchParams = request.nextUrl.searchParams;
  const params = searchParams.toString();

  const config = getParams(params);
  const body = await request.formData();

  const externalReq = await apiLeggere({
    method: "POST",
    url: `${config.url}?${config.params}`,
    data: body,
    headers: { Authorization: authorization, "Gee-Token": geeToken },
  }).catch((error) => {
    return error.response;
  });

  return NextResponse.json(externalReq.data, { status: externalReq.status });
}
