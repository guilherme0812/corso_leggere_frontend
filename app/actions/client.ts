"use server";

import { apiServerLeggere } from "../_services/api";
import { IClient } from "../_services/client";

export const createClient = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.hasWhatsapp = data.hasWhatsapp == "true";

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/client",
      method: "POST",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const updateClient = async (formData: FormData) => {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.hasWhatsapp = data.hasWhatsapp == "true";

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/client",
      method: "PUT",
      data,
    });

    return res?.data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteClient = async (formData: FormData) => {
  const params: Record<string, any> = {};
  formData.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const res = await apiServerLeggere<IClient[]>({
      url: "/client",
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
