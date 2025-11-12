"use server";

import { apiServerLeggere } from "../_services/api";
import { UserDataType } from "../_types/login";

export const updateUser = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.hasWhatsapp = data.hasWhatsapp == "true";

  try {
    const res = await apiServerLeggere<UserDataType[]>({
      url: "/user",
      method: "PUT",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const createUser = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.hasWhatsapp = data.hasWhatsapp == "true";

  try {
    const res = await apiServerLeggere<UserDataType[]>({
      url: "/register",
      method: "POST",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteUser = async (formData: FormData) => {
  const params: Record<string, any> = {};
  formData.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const res = await apiServerLeggere<UserDataType[]>({
      url: "/users",
      method: "DELETE",
      params,
    });

    console.log("delete params: ", params);

    console.log("delete res :", res.data);
    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};
