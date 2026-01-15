import { getPrefix } from ".";
import { UserDataType } from "../_types/login";
import { apiLeggere, apiServerLeggere } from "./api";

export enum Role {
  admin = "admin",
  owner = "owner",
  employee = "employee",
}

export enum UserStatusEnum {
  "PENDING", // Criado, mas ainda sem empresa vinculada
  "ACTIVE", // Ativo e com empresa associada
  "INACTIVE", // Inativo por escolha do usuário ou administrador
  "SUSPENDED", // Bloqueado temporariamente
  "DELETED", // Conta removida (opcional)
}

export interface UserCreate {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId: string;
  role: Role;
  phone: string | null;
  hasWhatsapp: boolean;
  profilePicture: string | null;
  status?: any;
  lastLoginAt: string | null;
}

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

export const getUsersClientSide = async ({ name }: { name?: string | null }, _prefix?: string) => {
  try {
    const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<UserDataType[]>({
      url: `${prefix}/users`,
      method: "GET",
      params: { name },
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

export const updateUserDetailsClientSide = async (body: UpdateUserDTO, preffix?: "/admin") => {
  try {
    const res = await apiLeggere<UserDataType>({
      url: `${preffix}/user`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const createUserDetailsClientSide = async ({ body, preffix }: { body: UpdateUserDTO; preffix?: "/admin" }) => {
  try {
    const res = await apiLeggere<UserCreate>({
      url: `${preffix}/register`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteUserDetailsClientSide = async ({ id, preffix }: { id: string; preffix?: "/admin" }) => {
  try {
    const res = await apiLeggere<UserCreate>({
      url: `${preffix}/user`,
      method: "DELETE",
      params: { id },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};

export type UpdatePassarordDto = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const updatePasswordClientSide = async (body: UpdatePassarordDto) => {
  try {
    const res = await apiLeggere({
      url: `/user/password`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("Error");
  }
};
