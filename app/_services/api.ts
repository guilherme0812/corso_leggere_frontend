import axios from "axios";
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

if (token) {
  apiLeggere.defaults.headers["Authorization"] = `${token}`;

  internalApiAxios.defaults.headers["Authorization"] = `${token}`;
  internalApiAxios.defaults.headers["Gee-Token"] = `${apiLeggere}`;
}
