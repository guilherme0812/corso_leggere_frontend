import { apiLeggere } from "./api";

export async function apiLeggereServerInstance<T>({
  url,
  params,
  method,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
}) {
  const response = await apiLeggere<T>({
    method,
    url,
    params,
  });
  return response;
}
