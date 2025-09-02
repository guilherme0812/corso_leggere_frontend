import { getServerSession } from "next-auth";
import { handler as authOptions } from "@/app/_utils/auth";
import { apiLeggere } from "./api";

export async function apiLeggereServerInstance(url: string) {
  const session = (await getServerSession(authOptions)) as any;

  return apiLeggere.get(url, {
    headers: {
      Authorization: `${session?.user?.token}`,
    },
  });
}
