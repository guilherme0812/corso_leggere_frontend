import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const cookies = parseCookies();
export const LEGGERE_TOKEN_KEY = "LEGGERE-TOKEN";
const token = cookies[LEGGERE_TOKEN_KEY];

export const apiLeggere = axios.create({
  baseURL: `${process.env.LEGGERE_API_URL}`,
});
export const apiServerLeggere = axios.create({
  baseURL: `${process.env.LEGGERE_API_URL}`,
});

export const internalApiAxios = axios.create({
  baseURL: "/api",
});

export const apiIBGE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IBGE_API,
});

apiLeggere.interceptors.request.use(async (config) => {
  const session = (await getSession()) as any;
  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }
  return config;
});
apiServerLeggere.interceptors.request.use(async (config) => {
  const session = (await getServerSession(authOptions)) as any;
  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }
  return config;
});

if (token) {
  apiLeggere.defaults.headers["Authorization"] = `${token}`;

  internalApiAxios.defaults.headers["Authorization"] = `${token}`;
  internalApiAxios.defaults.headers["Gee-Token"] = `${apiLeggere}`;
}
