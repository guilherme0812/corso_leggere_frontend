import { getPrefix } from ".";
import { UserDataType } from "../_types/login";
import { apiLeggere, apiServerLeggere } from "./api";

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

export type UpdateUserDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  companyId: string;
  profilePicture: string | null;
  hasWhatsapp: boolean;
  status: string;
};

export const updateUserDetailsClientSide = async (body: UpdateUserDTO) => {
  try {
    const res = await apiLeggere<UserDataType>({
      url: `/user`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
