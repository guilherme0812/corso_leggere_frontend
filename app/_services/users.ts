import { getPrefix } from ".";
import { UserDataType } from "../_types/login";
import { apiServerLeggere } from "./api";

export const getUsers = async ({}: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<UserDataType[]>({
      url: `${prefix}/users`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
