import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export const getPrefix = async () => {
  const session = (await getServerSession(authOptions)) as any;

  return session?.user?.role == "admin" ? "/admin" : "";
};
