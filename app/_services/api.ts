import axios from "axios";
import { getSession } from "next-auth/react";
import { parseCookies } from "nookies";

const cookies = parseCookies();
export const LEGGERE_TOKEN_KEY = "LEGGERE-TOKEN";
const token = cookies[LEGGERE_TOKEN_KEY];

export const apiLeggere = axios.create({
  baseURL: `${process.env.LEGGERE_API_URL}`,
});

export const internalApiAxios = axios.create({
  baseURL: "/api",
});

apiLeggere.interceptors.request.use(async (config) => {
  const session = (await getSession()) as any;
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
