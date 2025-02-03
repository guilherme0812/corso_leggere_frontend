import { UserDataType } from "@/app/_types/login";
import { apiLeggere } from "../api";

export type LoginParam = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginParam) {
  try {
    const req = await apiLeggere<UserDataType>({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });

    return req.data;
  } catch (error: any) {
    console.log(error);
  }
}
