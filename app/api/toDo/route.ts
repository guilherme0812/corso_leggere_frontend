import { apiLeggere } from "@/app/_services/api";
import { getParams } from "@/app/_utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const geeToken = headersInstance.get("Gee-Token");

  const searchParams = request.nextUrl.searchParams;
  const params = searchParams.toString();

  const config = getParams(params);

  const externalReq = await apiLeggere({
    method: "GET",
    url: `${config.url}?${config.params}`,
    headers: { Authorization: authorization, "Gee-Token": geeToken },
  }).catch((error: any) => {
    return error.response;
  });

  return NextResponse.json(externalReq.data, { status: externalReq.status });
}

export async function POST(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const geeToken = headersInstance.get("Gee-Token");

  const searchParams = request.nextUrl.searchParams;
  const params = searchParams.toString();

  const config = getParams(params);
  const body = await request.json();

  const externalReq = await apiLeggere({
    method: "POST",
    url: `${config.url}?${config.params}`,
    data: body,
    headers: { Authorization: authorization, "Gee-Token": geeToken },
  }).catch((error: any) => {
    return error.response;
  });

  return NextResponse.json(externalReq.data, { status: externalReq.status });
}

export async function PUT(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const geeToken = headersInstance.get("Gee-Token");

  const searchParams = request.nextUrl.searchParams;
  const params = searchParams.toString();

  const config = getParams(params);
  const body = await request.json();

  const externalReq = await apiLeggere({
    method: "PUT",
    url: `${config.url}?${config.params}`,
    data: body,
    headers: { Authorization: authorization, "Gee-Token": geeToken },
  }).catch((error: any) => {
    return error.response;
  });

  return NextResponse.json(externalReq.data, { status: externalReq.status });
}

export async function DELETE(request: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("authorization");
  const geeToken = headersInstance.get("Gee-Token");

  const searchParams = request.nextUrl.searchParams;
  const params = searchParams.toString();

  const config = getParams(params);

  const externalReq = await apiLeggere({
    method: "DELETE",
    url: `${config.url}?${config.params}`,
    headers: { Authorization: authorization, "Gee-Token": geeToken },
  }).catch((error: any) => {
    return error.response;
  });

  return NextResponse.json(externalReq.data, { status: externalReq.status });
}
