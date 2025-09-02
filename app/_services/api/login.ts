import { UserDataType } from "@/app/_types/login";
import axios from "axios";

export type LoginParam = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginParam) {
  try {
    const req = await axios<UserDataType>({
      method: "POST",
      url: "http://localhost:3001/api/login",
      data: {
        email,
        password,
      },
    });

    return req.data;
  } catch (error: any) {
    console.log("meu erro:", error);
  }
}
